import * as firebase from "firebase";

import {
  Education,
  Experience,
  Personalia,
  Project,
  Publication,
  Resume,
  SideProject,
  Skill,
} from "../types";
import { format } from "date-fns";

export default class ResumeModel {
  personalia: Personalia;
  education: Education[];
  introduction: string;
  avatar: string;
  skills: Skill[];
  sideProjects: SideProject[] = [];
  publications: Publication[];
  experience: Experience[];
  projects: Project[];

  constructor(data: firebase.firestore.DocumentData | Resume) {
    this.personalia = data.personalia;
    this.personalia.dateOfBirth = this.formatTimestamp(this.personalia.dateOfBirth);
    this.introduction = data.introduction;
    this.avatar = data.avatar;
    this.publications = data.publications;
    this.skills = data.skills;
    this.education = data.education.map((education: Education) => {
      return {
        name: education.name,
        institute: education.institute,
      };
    });
    this.experience = data.experience.map((experience: Experience) => {
      return {
        role: experience.role,
        company: experience.company,
        description: experience.description,
      };
    });
    this.projects = data.projects.map((project: Project) => {
      project.startDate = this.formatTimestamp(project.startDate);
    });
  }

  formatTimestamp(timestamp: any, dateFormat = "MMMM yyyy") {
    return format(timestamp.seconds * 1000, dateFormat).toUpperCase();
  }
}
