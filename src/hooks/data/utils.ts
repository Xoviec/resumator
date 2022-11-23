import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";

/**
 * some data has props that are null or undefined, causing errors in the code
 * @TODO: make sure that the data in the DB is sanitized (make a http request that runs on deploy, making sure that data exists)
 * @param resume
 * @returns
 */
export const sanitiseResumeData = (resume: ResumeModel): ResumeModel => {
  return {
    ...resume,
    personalia: resume.personalia ?? {},
    projects: resume.projects ?? [],
    experience: resume.experience ?? [],
    education: resume.education ?? [],
    publications: resume.publications ?? [],
    skills: resume.skills ?? [],
    socialLinks: resume.socialLinks ?? [],
    sideProjects: resume.sideProjects ?? [],
    languages: resume.languages ?? [],
  };
};
