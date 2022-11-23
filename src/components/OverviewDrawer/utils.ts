import Fuse from "fuse.js";
import { normalizeString } from "../../lib";
import { castDate, yearsAndMonthString } from "../../lib/date";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";

/**
 * returns the fullname of the resume user.
 * if there is no name return ID
 * @param resume ResumeModel
 * @returns string the fullname of resume
 */
export const getDisplayName = (resume: ResumeModel): string => {
  const { id, personalia: { firstName, lastName } = {} } = resume;

  let str = ``;
  if (firstName) str += firstName;
  if (firstName && lastName) str += " ";
  if (lastName) str += lastName;

  if (!str) return `No name - ${id}`;
  return str;
};

/**
 * Only used in the searchFunc
 * when the path is an array it needs to return a . notated string
 * if it already is a string just return the string
 * @param path string | array
 * @returns string
 */
export const reduceFusePathToString = (path: string | string[]): string => {
  if (Array.isArray(path)) return path.reduce((prev, cur) => `${prev}.${cur}`);
  return path;
};

/**
 * Only used in the searchFunc
 * when the path is an Array it needs to return the value of the correct prop
 * @param resume
 * @param path
 * @returns could be any part of the ResumeModel I'm afraid
 */
export const getPropValue = (
  resume: ResumeModel,
  path: string | string[]
): string | readonly string[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = resume;
  if (Array.isArray(path)) {
    path.forEach((prop) => {
      value = value[prop];
    });

    if (value) return normalizeString(value);
  }
  return "";
};

/**
 * the searchFunction needed to Fuzzy search in fuse.
 * Only usable for FuseJS
 * @param resume
 * @param path
 * @returns string
 */
export const searchFunc = (
  resume: ResumeModel,
  path: string | string[]
): string | readonly string[] => {
  const pathString = reduceFusePathToString(path);

  switch (pathString) {
    case "skills.name":
      return resume.skills.map((skill) => normalizeString(skill.name));
    case "experience.company":
      return resume.experience.map((experience) =>
        normalizeString(experience.company)
      );
    case "projects.company":
      return resume.projects.map((projects) => normalizeString(projects.company));
    default:
      return getPropValue(resume, path);
  }

  return "";
};

export const getFilteredSearchResults = (
  searchTerms: string,
  resumes: ResumeModel[]
): Fuse.FuseResult<ResumeModel>[] => {
  let filteredResumes: Fuse.FuseResult<ResumeModel>[] = [];
  const searchTermsArray = searchTerms.split(" ");

  if (!searchTerms) {
    filteredResumes = resumes.map((resume) => ({
      item: resume,
      matches: [],
    })) as unknown as Fuse.FuseResult<ResumeModel>[];

    return filteredResumes;
  }

  let tempFilteredResumes: ResumeModel[] = [...resumes];
  let searchResult: Fuse.FuseResult<ResumeModel>[];

  searchTermsArray.forEach((term) => {
    if (searchResult) {
      tempFilteredResumes = searchResult.map((resumeItem) => resumeItem.item);
    }

    const options: Fuse.IFuseOptions<ResumeModel> = {
      threshold: 0.2,
      includeMatches: true,
      getFn: searchFunc,
      keys: [
        "personalia.firstName",
        "personalia.lastName",
        "personalia.city",
        "skills.name",
        "projects.company",
        "experience.company",
      ],
      useExtendedSearch: true,
      findAllMatches: true,
      ignoreLocation: true,
    };

    const model = new Fuse(tempFilteredResumes, options);
    searchResult = mergeMatches(model.search(term), searchResult);
    filteredResumes = searchResult;
  });

  return filteredResumes;
};

/**
 * Check if the match is already in the array
 * @param matchesArray
 * @param match
 * @returns boolean
 */
export const findMatch = (
  matchesArray: Fuse.FuseResultMatch[],
  match: Fuse.FuseResultMatch
): boolean => {
  const experienceCompanyArray = ["experience.company", "projects.company"];
  return !!matchesArray.find(
    (findMatch) =>
      findMatch.value === match.value &&
      (findMatch.key === match.key ||
        experienceCompanyArray.includes(match.key ?? ""))
  );
};

/**
 * remove all duplicate matches from currentResult Array and add to previous resultArray
 * @param prevResult Fuse.FuseResult<ResumeModel>[]
 * @param currentResult Fuse.FuseResult<ResumeModel>
 * @returns Fuse.FuseResult<ResumeModel>[]
 */
export const reduceDublicateSearchMatches = (
  prevResult: Fuse.FuseResult<ResumeModel>[],
  currentResult: Fuse.FuseResult<ResumeModel>
): Fuse.FuseResult<ResumeModel>[] => {
  let matches: Fuse.FuseResultMatch[] = [];

  currentResult.matches?.forEach((match) => {
    if (!matches.length || !findMatch(matches, match)) {
      matches = [...matches, match];
    }
  });

  currentResult.matches = matches;
  return [...prevResult, currentResult];
};

/**
 * map multiple search matches in to 1 object
 * @param prevSearch Fuse.FuseResult<ResumeModel>[]
 * @returns Fuse.FuseResult<ResumeModel>
 */
export const mapCurrentSearch =
  (prevSearch: Fuse.FuseResult<ResumeModel>[]) =>
  (fuseResult: Fuse.FuseResult<ResumeModel>): Fuse.FuseResult<ResumeModel> => {
    const id = fuseResult.item.id;
    const foundItem = prevSearch.find((item) => {
      return item.item.id === id;
    });

    if (foundItem) {
      return {
        ...foundItem,
        matches: [...(foundItem.matches ?? []), ...(fuseResult.matches ?? [])],
      };
    }

    return fuseResult;
  };

/**
 * The currentSearch results do not have the matches objet of the previous.
 * we want all matching searches, so that we can show all the correct data.
 *
 * example:
 * currentSearch[0] = {item: {id: 1...}, matches: [{key: personalia.city}]}
 * prevSearch[0] = {item: {id: 1...}, matches: [{key: skills.name}]}
 *
 * we want to return:
 * returnSearch[0] = {item: {id: 1...}, matches: [{key: personalia.city}, {key: skills.name}]}
 *
 * important: we dont want to return duplicate matches on key AND value
 * so return 1 match when :  [{key: 'skills.name', value:'typescript'},{key: 'skills.name', value:'typescript'}]
 * return 2 matches when: [{key: 'skills.name', value:'typescript'},{key: 'skills.name', value:'react'}]
 *
 *  @param currentSearch Fuse.FuseResult<ResumeModel>[]
 * @param prevSearch Fuse.FuseResult<ResumeModel>[]
 * @returns Fuse.FuseResult<ResumeModel>[]
 */
const mergeMatches = (
  currentSearch: Fuse.FuseResult<ResumeModel>[],
  prevSearch: Fuse.FuseResult<ResumeModel>[]
): Fuse.FuseResult<ResumeModel>[] => {
  if (!prevSearch) return currentSearch.reduce(reduceDublicateSearchMatches, []);

  return currentSearch
    .map(mapCurrentSearch(prevSearch))
    .reduce(reduceDublicateSearchMatches, []);
};

export const sortByName = (
  a: Fuse.FuseResult<ResumeModel>,
  b: Fuse.FuseResult<ResumeModel>
) => {
  if (getDisplayName(a.item) < getDisplayName(b.item)) return -1;
  if (getDisplayName(a.item) > getDisplayName(b.item)) return 1;
  return 0;
};

/**
 * returns the amount of months between 2 dates (including the current month)
 * @param start Date
 * @param end Date
 * @returns number
 */
export const calculateExperienceMonths = (start: Date, end: Date): number => {
  const endDate = castDate(end) ?? new Date();
  const startDate = castDate(start) ?? endDate;

  if (startDate > endDate) return 1;

  // the +1 at the end is for the current month
  return (
    endDate.getFullYear() * 12 +
    endDate.getMonth() +
    1 -
    (startDate.getFullYear() * 12 + startDate.getMonth() + 1) +
    1
  );
};

/**
 * return all the months of experience in a company on a resume
 * @param resume
 * @param company
 * @returns
 */
export const findExperience = (resume: ResumeModel, company?: string): string => {
  const totalMonths = [...resume.experience, ...resume.projects]
    .filter((experience) => experience.company === company)
    .reduce((prev, curr) => {
      return prev + calculateExperienceMonths(curr.startDate, curr.endDate);
    }, 0);

  return yearsAndMonthString(totalMonths);
};

/**
 * return all the months of experience in a skill on a resume
 * @param resume
 * @param skillStr
 * @returns
 */
export const findSkillExperience = (
  resume: ResumeModel,
  skillStr?: string
): string => {
  const totalMonths = [...resume.experience, ...resume.projects]
    .flatMap((experience) => {
      const startDate = experience.startDate;
      const endDate = experience.endDate;

      if (!experience.stackAndTechniques) return 0;
      const months = experience.stackAndTechniques
        .filter((skill) => skill.name === skillStr)
        .reduce((prev, curr) => {
          return prev + calculateExperienceMonths(startDate, endDate);
        }, 0);

      return months;
    })
    .reduce((prev, curr) => prev + curr, 0);

  return yearsAndMonthString(totalMonths);
};
