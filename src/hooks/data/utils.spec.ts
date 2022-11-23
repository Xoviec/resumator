import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { sanitiseResumeData } from "./utils";

const resume = {
  id: "1",
  isImport: false,
  isArchived: false,
  introduction: "test",
  motivation: "test motivation",
  userId: "2",
  lastUpdated: "11111",
} as unknown as ResumeModel;

describe("data utils", () => {
  describe("sanitiseResumeData", () => {
    it("should add the missing properties of the resume", () => {
      expect(resume.personalia).toEqual(undefined);
      expect(resume.projects).toEqual(undefined);
      expect(resume.experience).toEqual(undefined);
      expect(resume.education).toEqual(undefined);
      expect(resume.publications).toEqual(undefined);
      expect(resume.skills).toEqual(undefined);
      expect(resume.socialLinks).toEqual(undefined);
      expect(resume.sideProjects).toEqual(undefined);
      expect(resume.languages).toEqual(undefined);

      const result = sanitiseResumeData(resume);

      expect(result.personalia).toEqual({});
      expect(result.projects).toEqual([]);
      expect(result.experience).toEqual([]);
      expect(result.education).toEqual([]);
      expect(result.publications).toEqual([]);
      expect(result.skills).toEqual([]);
      expect(result.socialLinks).toEqual([]);
      expect(result.sideProjects).toEqual([]);
      expect(result.languages).toEqual([]);
    });
  });
});
