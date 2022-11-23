import Fuse from "fuse.js";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import {
  getDisplayName,
  reduceFusePathToString,
  getPropValue,
  searchFunc,
  getFilteredSearchResults,
  findMatch,
  reduceDublicateSearchMatches,
  mapCurrentSearch,
  sortByName,
  calculateExperienceMonths,
  findExperience,
  findSkillExperience,
} from "./utils";

describe("overViewDrawer utils", () => {
  describe("findSkillExperience", () => {
    it("should return the correct amount of months if a skill is in 1 project return months", () => {
      const resume = {
        projects: [
          {
            stackAndTechniques: [
              {
                name: "react",
              },
            ],
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
          {
            stackAndTechniques: [
              {
                name: "vue",
              },
            ],
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
        experience: [
          {
            stackAndTechniques: [
              {
                name: "angular",
              },
            ],
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findSkillExperience(resume, "react");
      expect(result).toEqual("11 months");
    });

    it("should return the correct amount of months if a skill is in multiple project return months", () => {
      const resume = {
        projects: [
          {
            stackAndTechniques: [
              {
                name: "react",
              },
            ],
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
          {
            stackAndTechniques: [
              {
                name: "react",
              },
            ],
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
        experience: [
          {
            stackAndTechniques: [
              {
                name: "angular",
              },
            ],
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findSkillExperience(resume, "react");
      expect(result).toEqual("1 year");
    });

    it("should return the correct amount of months if a skill is in multiple projects and experience return months", () => {
      const resume = {
        projects: [
          {
            stackAndTechniques: [
              {
                name: "react",
              },
            ],
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
          {
            stackAndTechniques: [
              {
                name: "react",
              },
            ],
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
        experience: [
          {
            stackAndTechniques: [
              {
                name: "react",
              },
            ],
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findSkillExperience(resume, "react");
      expect(result).toEqual("1 year and 11 months");
    });
  });

  describe("findExperience", () => {
    it("should return the correct amount of months if there is 1 project with the company return months", () => {
      const resume = {
        projects: [
          {
            company: "qrazie",
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
          {
            company: "abn",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
        experience: [
          {
            company: "io",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findExperience(resume, "qrazie");
      expect(result).toEqual("11 months");
    });
    it("should return the correct amount of months if there is 1 project with the company return years", () => {
      const resume = {
        projects: [
          {
            company: "qrazie",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 1669105400 },
          },
          {
            company: "abn",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
        experience: [
          {
            company: "io",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findExperience(resume, "qrazie");
      expect(result).toEqual("45 years and 2 months");
    });

    it("should return the correct amount of months if there are more projects with same company return string", () => {
      const resume = {
        projects: [
          {
            company: "qrazie",
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
          {
            company: "qrazie",
            startDate: { seconds: 1649838200 },
            endDate: { seconds: 1669105400 },
          },
        ],
        experience: [
          {
            company: "io",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findExperience(resume, "qrazie");
      expect(result).toEqual("1 year and 7 months");
    });

    it("should return the correct amount of months if there are more projects and experience with same company return string", () => {
      const resume = {
        projects: [
          {
            company: "qrazie",
            startDate: { seconds: 1642062200 },
            endDate: { seconds: 1669105400 },
          },
          {
            company: "io",
            startDate: { seconds: 245579000 },
            endDate: { seconds: 245579000 },
          },
        ],
        experience: [
          {
            company: "qrazie",
            startDate: { seconds: 1665649400 },
            endDate: { seconds: 1669105400 },
          },
        ],
      } as unknown as ResumeModel;

      const result = findExperience(resume, "qrazie");
      expect(result).toEqual("1 year and 1 month");
    });
  });
  describe("calculateExperienceMonths", () => {
    it("should return the amount of months between 2 dates", () => {
      const startDate = { seconds: 245579000 } as unknown as Date;
      const endDate = { seconds: 1670919800 } as unknown as Date;

      expect(calculateExperienceMonths(startDate, endDate)).toEqual(543);
    });
    it("should return 1 when startDate is later than endDate", () => {
      const endDate = { seconds: 245579000 } as unknown as Date;
      const startDate = { seconds: 1670919800 } as unknown as Date;

      expect(calculateExperienceMonths(startDate, endDate)).toEqual(1);
    });
    it("should return 1 when startDate is null", () => {
      const endDate = { seconds: 245579000 } as unknown as Date;
      const startDate = null as unknown as Date;

      expect(calculateExperienceMonths(startDate, endDate)).toEqual(1);
    });
  });

  describe("sortByName", () => {
    it("should order the resumes on personalia firstName lastName", () => {
      const a = {
        item: {
          personalia: {
            firstName: "Skeletor",
            lastName: "of Grayskull",
          },
        },
      } as unknown as Fuse.FuseResult<ResumeModel>;

      const b = {
        item: {
          personalia: {
            firstName: "He-man",
            lastName: "Master of the Universe",
          },
        },
      } as unknown as Fuse.FuseResult<ResumeModel>;

      expect(sortByName(a, b)).toEqual(1);
      expect(sortByName(b, a)).toEqual(-1);
      expect(sortByName(a, a)).toEqual(0);
    });
  });

  describe("getDisplayName", () => {
    it("should return the fullname of the user", () => {
      const resume = {
        id: "test",
        personalia: {
          firstName: "He-man",
          lastName: "of Grayskull",
        },
      } as unknown as ResumeModel;

      const expectedResult = "He-man of Grayskull";
      expect(getDisplayName(resume)).toEqual(expectedResult);
    });

    it("should return only the ID when there is no name", () => {
      const resume = {
        id: "test",
      } as unknown as ResumeModel;

      const expectedResult = "No name - test";
      expect(getDisplayName(resume)).toEqual(expectedResult);
    });
    it("should only firstName when there is no lastname", () => {
      const resume = {
        id: "test",
        personalia: {
          firstName: "He-man",
        },
      } as unknown as ResumeModel;

      const expectedResult = "He-man";
      expect(getDisplayName(resume)).toEqual(expectedResult);
    });

    it("should only lastname when there is no firstname", () => {
      const resume = {
        id: "test",
        personalia: {
          firstName: "of Grayskull",
        },
      } as unknown as ResumeModel;

      const expectedResult = "of Grayskull";
      expect(getDisplayName(resume)).toEqual(expectedResult);
    });
  });

  describe("reduceFusePathToString", () => {
    it("should return a . annotated string if path is an array", () => {
      const data = ["projects", "companyname"];
      const expectedresult = "projects.companyname";
      const result = reduceFusePathToString(data);

      expect(result).toEqual(expectedresult);
    });
    it("should return the string if path is a string", () => {
      const data = "projects.companyname";
      const result = reduceFusePathToString(data);

      expect(result).toEqual(data);
    });
  });

  describe("getPropValue", () => {
    it("should return an empty string when path is a string", () => {
      const path = "personalia.firstName";
      const resume = {
        personalia: {
          firstName: "He-man",
          lastName: "Autobots",
        },
      } as unknown as ResumeModel;
      const result = getPropValue(resume, path);

      expect(result).toEqual("");
    });

    it("should return an firstname when path is an array", () => {
      const path = ["personalia", "firstName"];
      const resume = {
        personalia: {
          firstName: "He-man",
          lastName: "Autobots",
        },
      } as unknown as ResumeModel;
      const result = getPropValue(resume, path);

      expect(result).toEqual("He-man");
    });
  });

  describe("searchFunc", () => {
    const resume = {
      personalia: {
        firstName: "He-man",
        lastName: "Autobots",
      },
      skills: [
        {
          name: "React",
        },
        {
          name: "Vué",
        },
      ],
      experience: [
        {
          company: "qrazie",
        },
        {
          company: "Citroën",
        },
      ],
      projects: [
        {
          company: "iO",
        },
        {
          company: "ABN AMRÔ",
        },
      ],
    } as unknown as ResumeModel;

    it("should return an array of skills when asked for the skills path", () => {
      const result = searchFunc(resume, "skills.name");
      const expectedResult: string[] = ["React", "Vue"];
      expect(result).toEqual(expectedResult);
    });
    it("should return an array of company names when asked for the experience path", () => {
      const result = searchFunc(resume, "experience.company");
      const expectedResult: string[] = ["qrazie", "Citroen"];
      expect(result).toEqual(expectedResult);
    });
    it("should return an array of company names when asked for the projects path", () => {
      const result = searchFunc(resume, "projects.company");
      const expectedResult: string[] = ["iO", "ABN AMRO"];
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getFilteredSearchResults", () => {
    const resumes = [
      {
        personalia: {
          firstName: "He-man",
          lastName: "Master of the Universe",
        },
        skills: [
          {
            name: "React",
          },
          {
            name: "Vué",
          },
        ],
        experience: [
          {
            company: "qrazie",
          },
          {
            company: "Citroën",
          },
        ],
        projects: [
          {
            company: "iO",
          },
          {
            company: "ABN AMRÔ",
          },
        ],
      },
      {
        personalia: {
          firstName: "Skeletor",
          lastName: "of Grayskull",
        },
        skills: [
          {
            name: "Angular",
          },
          {
            name: "Svelte",
          },
        ],
        experience: [
          {
            company: "qrazie",
          },
          {
            company: "Twitter",
          },
        ],
        projects: [
          {
            company: "Hyves",
          },
          {
            company: "Geocities",
          },
        ],
      },
      {
        personalia: {
          firstName: "Orko",
          lastName: "Ghost",
        },
        skills: [
          {
            name: "Scrum",
          },
          {
            name: "Agile",
          },
        ],
        experience: [
          {
            company: "Eneco",
          },
          {
            company: "Quby",
          },
        ],
        projects: [
          {
            company: "Vättenfal",
          },
          {
            company: "Greenchoice",
          },
        ],
      },
    ] as unknown as ResumeModel[];

    it("should return all resumes when there is no searchterm", () => {
      const result = getFilteredSearchResults("", resumes);
      expect(result.length).toBe(3);
    });

    it("should return 2 resume when there is 1 searchterm", () => {
      const result = getFilteredSearchResults("qrazie", resumes);

      expect(result.length).toBe(2);
      expect(result[0].item.personalia.firstName).toEqual("He-man");
      expect(result[1].item.personalia.firstName).toEqual("Skeletor");
    });
    it("should return 1 resume when there are nore searchterms", () => {
      const result = getFilteredSearchResults("qrazie univers", resumes);

      expect(result.length).toBe(1);
      expect(result[0].item.personalia.firstName).toEqual("He-man");
    });
    it("should return 1 resume when the searchterm is fuzzy", () => {
      const result = getFilteredSearchResults("heman", resumes);

      expect(result.length).toBe(1);
      expect(result[0].item.personalia.firstName).toEqual("He-man");
    });
  });

  describe("findMatch", () => {
    const matches = [
      {
        key: "skills.name",
        value: "typescript",
      },
      {
        key: "experience.company",
        value: "qrazie",
      },
    ] as Fuse.FuseResultMatch[];
    it("should return false when the values do not match", () => {
      const match = {
        key: "skills.name",
        value: "react",
      } as Fuse.FuseResultMatch;
      const result = findMatch(matches, match);
      expect(result).toEqual(false);
    });
    it("should return true when the values do match", () => {
      const match = {
        key: "skills.name",
        value: "typescript",
      } as Fuse.FuseResultMatch;
      const result = findMatch(matches, match);
      expect(result).toEqual(true);
    });
    it("should return true when the values do match, but one key is experience and other is projects", () => {
      const match = {
        key: "projects.company",
        value: "qrazie",
      } as Fuse.FuseResultMatch;
      const result = findMatch(matches, match);
      expect(result).toEqual(true);
    });
    it("should return false when the values do NOT match and one key is experience and other is projects", () => {
      const match = {
        key: "projects.company",
        value: "test",
      } as Fuse.FuseResultMatch;
      const result = findMatch(matches, match);
      expect(result).toEqual(false);
    });
    it("should return false when the values do NOT match and one key is experience or projects and other is skills", () => {
      const match = {
        key: "skills.name",
        value: "qrazie",
      } as Fuse.FuseResultMatch;
      const result = findMatch(matches, match);
      expect(result).toEqual(false);
    });
  });

  describe("reduceDublicateSearchMatches", () => {
    const prevResults = [
      {
        item: {
          personalia: {},
        },
        matches: [
          {
            key: "skills.name",
            value: "typescript",
          },
        ],
      },
    ] as unknown as Fuse.FuseResult<ResumeModel>[];

    it("should return 2 objects in array", () => {
      const currentResult = {
        item: {
          personalia: {},
        },
        matches: [
          {
            key: "skills.name",
            value: "react",
          },
        ],
      } as unknown as Fuse.FuseResult<ResumeModel>;
      const result = reduceDublicateSearchMatches(prevResults, currentResult);
      expect(result.length).toEqual(2);
    });
  });

  describe("mapCurrentSearch", () => {
    const prevResults = [
      {
        item: {
          id: "1",
          personalia: {
            firstName: "He-man",
            lastName: "Master of the Universe",
          },
        },
        matches: [
          {
            key: "experience.companyName",
            value: "ABN",
          },
        ],
      },
    ] as unknown as Fuse.FuseResult<ResumeModel>[];
    it("should return the current, when no matching item is found", () => {
      const current = {
        item: {
          id: "2",
          personalia: {
            firstName: "He-man",
            lastName: "Master of the Universe",
          },
        },
        matches: [
          {
            key: "skills.name",
            value: "typescript",
          },
        ],
      } as unknown as Fuse.FuseResult<ResumeModel>;

      const result = mapCurrentSearch(prevResults)(current);
      expect(result).toEqual(current);
    });
    it("should return the current with a new match, when item is found", () => {
      const current = {
        item: {
          id: "1",
          personalia: {
            firstName: "He-man",
            lastName: "Master of the Universe",
          },
        },
        matches: [
          {
            key: "skills.name",
            value: "typescript",
          },
        ],
      } as unknown as Fuse.FuseResult<ResumeModel>;

      const expectedResult = {
        item: {
          id: "1",
          personalia: {
            firstName: "He-man",
            lastName: "Master of the Universe",
          },
        },
        matches: [
          {
            key: "experience.companyName",
            value: "ABN",
          },
          {
            key: "skills.name",
            value: "typescript",
          },
        ],
      } as unknown as Fuse.FuseResult<ResumeModel>;

      const result = mapCurrentSearch(prevResults)(current);
      expect(result).toEqual(expectedResult);
    });
  });
});
