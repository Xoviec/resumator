import { EducationModel } from "./EducationItem";
import { ExperienceModel } from "./ExperienceItem";
import { SideProjectModel } from "./SideProjectItem";
import { SkillModel } from "./Skills";
import { SocialLinkModel } from "./SocialLinks";
import { PersonaliaModel } from "./TopSection";

export interface ResumeModel {
  id: string;
  personalia: PersonaliaModel;
  introduction: string | undefined;
  projects: ExperienceModel[];
  experience: ExperienceModel[];
  skills: SkillModel[];
  sideProjects: SideProjectModel[];
  publications: SideProjectModel[];
  education: EducationModel[];
  socialLinks: SocialLinkModel[];
}
