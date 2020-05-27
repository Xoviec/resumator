import { Resume } from "../types";

export default class ResumeModel {
  firstName: string;
  introduction: string;
  skills: { skillName: string }[];
  projects: {
    projectRole: string;
    projectCompany: string;
  }[];
  education: { educationName: string; institute: string }[];
  constructor(data: firebase.firestore.DocumentData | Resume) {
    this.firstName = data.personalia.firstName;
    this.introduction = data.introduction;
    this.skills = data.skills.map((skill: { name: string }) => {
      return { skillName: skill.name };
    });
    this.projects = data.projects.map(
      (project: { role: string; company: string }) => {
        return {
          projectRole: project.role,
          projectCompany: project.company,
        };
      }
    );
    this.education = data.education.map((education: any) => {
      return {
        educationName: education.name,
        institute: education.institute,
      };
    });
  }
}
