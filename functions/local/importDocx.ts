/// <reference path="./types/mammoth/index.d.ts"/>
import { basename } from "path";
import * as mammoth from "mammoth";
import { 
  Education,
  Experience,
  Personalia,
  Project,
  Publication,
  SideProject,
  Skill,
  PartialResume
} from "../src/types";

type CollectionBySection<T> = {
  education: T
  experience: T
  intro: T
  projects: T
  publications: T
  sideProjects: T
  skills: T
}
type SectionType = keyof CollectionBySection<any>
type Section = {
  type: SectionType
  lines: string[]
}

const headingRegexes: CollectionBySection<RegExp> = {
  education:/^Education/i,
  experience: /^Work experience/i,
  intro: /^Hi, I am ([^\n]+)$/i,
  projects:/^Projects/i,
  publications: /^Publications/i,
  sideProjects:/^Side Projects/i,
  skills:/^Skills/i,
}
const dateRegex = /(\b\w+)?\s*([1-9][0-9]{3})/;

/**
 * Parse a resume from a docx at path
 *
 * @export
 * @param {string} path
 * @returns {Promise<PartialResume>}
 */
export default async function importDocx(path: string): Promise<PartialResume> {
  const filename = basename(path, ".docx");

  return mammoth.extractRawText({ path })
    .then(({ value }) => value)
    .then(correctSpacing)
    .then(extractSections)
    // .then(s => {console.log(s); return s})
    .then(sections => {
      const parsers: CollectionBySection<Function> = {
        education: parseEducation,
        experience: parseExperience,
        intro: parseIntro,
        projects: parseProjects,
        publications: parsePublications,
        sideProjects: parseSideProjects,
        skills: parseSkills,
      }

      return sections.reduce((resume, section)=> {
        const parser = parsers[section.type];
        let sectionData = (section.type == "intro")
        ? parseIntro(section.lines, filename)
        : { [section.type]: parser(section.lines) }
        
        return {
          ...resume,
          ...sectionData
        }
      }, {} as PartialResume);
    })
}

/**
 * Insert spaces before months
 *
 * @param {*} string
 * @returns {string}
 */
function correctSpacing(string: string): string {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]
  return string
    .replace(new RegExp(`(\\w)(${months.join("|")})`, "gi"), `$1 $2`)
}

/**
 * Convert plain text to an array of sections
 *
 * @param {string} string
 * @returns {Section[]}
 */
function extractSections(string: string): Section[] {
  const lines = string
    .split("\n")

  return lines.reduce((sections, line) => {
      for (const entry of Object.entries(headingRegexes) as [SectionType, RegExp][]) {
        const [ type, value ] = entry;
        if (line.search(value as RegExp) !== -1) {
          sections.push({ type, lines: [] })
          break;
        }
      }
      const [ {type, lines}, ...otherSections ] = sections.reverse();
      return [
        ...otherSections,
        {
          type,
          lines: [...lines, line]
        }
      ]
    }, [] as Section[]);
}

function parseIntro(lines: string[], filename: string): { personalia: Personalia, introduction: string} {
  const headingMatch = lines[0].match(headingRegexes.intro) || [];
  const firstName = headingMatch[1] || "";
  const lastName = filename.substring( filename.indexOf(firstName) + firstName.length );

  const { city, dateOfBirth, introduction }  = lines.reduce((acc, line) => {
    const cityAndDateMatch = line.match(new RegExp(`^(\\w+)\\sregion\\s–\\s[A-Z]{2}\\s–\\s(${dateRegex.source})`)) || [];
    if (cityAndDateMatch.length) {
      acc.city = cityAndDateMatch[1] || "";
      acc.dateOfBirth = (cityAndDateMatch[2]) ? `1 ${cityAndDateMatch[2]} UTC` : ''
    } else if (acc.city) {
      // Everything after region and date of birth is considered introduction
      acc.introduction = (acc.introduction)
        ? `${acc.introduction} ${line}`
        : line;
    }
    return acc;
  }, {} as { [key: string]: string });
  return {
    personalia: {
      firstName,
      lastName,
      email: "",
      dateOfBirth: new Date(dateOfBirth),
      city,
    },
    introduction,
  }
}

function parseEducation(lines: string[]): Education[] {
  return lines.slice(1, lines.length)
    .filter(line => line !== '')
    .reduce((acc, line) => {
      let entry = acc[acc.length - 1];
      if (entry.name === undefined) {
        entry.name = line;
      } else if (entry.institute === undefined) {
        entry.institute = line
      } else if(entry.startDate === undefined) {
        const [ startDate, endDate ] = getDateRange(line);
        entry.startDate = startDate;
        entry.endDate = endDate;

        // Probably done
        acc.push({ id: '' }) as Partial<Experience>;
      }
      return acc;
    }, [{}] as Partial<Education>[]);
}

function parseExperience(lines: string[]): Partial<Experience>[] {
  return lines.slice(1, lines.length)
    .filter(line => line !== '')
    .reduce((acc, line, index, lines) => {
      let lastEntry = acc.pop() as Partial<Experience>;
      let newEntry;

      // Try to guess what type of data the current line holds
      if (line.search(dateRegex) !== -1) {
        // If there is a line with a date, the previous line would have been a role. 
        const previousLine = lines[index - 1];
        const [ startDate, endDate ] = getDateRange(line);
        const entry = {
          startDate,
          endDate,
          company: line.substring(0, line.indexOf(startDate)).trim(),
          role: previousLine,
        }
        // If we were already adding found lines to the description, we have to revert that
        if (lastEntry.description) {
          lastEntry.description = lastEntry.description.replace(previousLine, '');
          newEntry = entry;
        } else {
          lastEntry = {
            ...lastEntry,
            ...entry
          }
        }
      } else if (line.indexOf(' – ') !== -1) {
        // If there is a line of techniques (separated by ' - '), it is always the last line
        lastEntry.stackAndTechniques = line.replace(/Techniques:\s*/, '').split(' - ').map(v => ({ name: v }));
        newEntry = {};
      } else if (lastEntry.role) {
        lastEntry.description = (lastEntry.description) 
          ? `${lastEntry.description}\n${line}` 
          : line
      } else {
        lastEntry.role = line
      }
      
      return [
        ...acc,
        lastEntry,
        ...(newEntry ? [ newEntry ] : []) // Add new entry at the end only when set
      ]
    }, [{}]);
}

function parseProjects(lines: string[]): Partial<Project>[] {
  return parseExperience(lines) // Experience and Project are similar
}

function parsePublications(lines: string[]): Partial<Publication>[] {
  return lines.slice(1, lines.length)
    .filter(line => line !== '')
    .reduce((acc, line, index) => {
      let lastEntry = acc.pop() as Partial<Publication>;
      if (index % 2) {
        lastEntry.description = line;
        lastEntry.title = line;
      } else {
        lastEntry.link = line;
      }
      return [
        ...acc,
        lastEntry
      ];
    }, [{}]);
}

function parseSideProjects(lines: string[]): Partial<SideProject>[] {
  return lines.slice(1, lines.length)
  .filter(line => line !== '')
  .reduce((acc, line, index) => {
    let lastEntry = acc.pop() as Partial<Publication>;
    if (index % 2) {
      lastEntry.title = line;
      lastEntry.description = line;
    } else if(line.match(/^http(s):\/\//)) {
      lastEntry.link = line;
    } else {
      lastEntry.description = line;
    }
    return [
      ...acc,
      lastEntry
    ];
  }, [{}]);
}

function parseSkills(lines: string[]): Skill[] {
  return lines.slice(1, lines.length)
    .filter(line => !line.match(/^\s*$/))
    .map(name => ({ name }))
}

function getDateRange(line: string):  [string, string] {
  const dateRangeRegex = new RegExp(`(?<start>${dateRegex.source})\\s+[–-]\\s+(?<end>${dateRegex.source}|current)`,"i");
  const matches = line.match(dateRangeRegex) || [];
  // 1 full hit and 6 capture groups, 1 (start) and 4 (end) are full match of date RegExp
  return [matches[1] || "", matches[4] || ""]
}
