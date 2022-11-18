import { LanguageProficiencyMap, ResumeLanguage } from "../../types/language";
import { EducationModel } from "./EducationItem";
import { ExperienceModel } from "./ExperienceItem";
import { SideProjectModel } from "./SideProjectItem";
import { SkillModel } from "./Skills";
import { SocialLinkModel } from "./SocialLinks";
import { PersonaliaModel } from "./TopSection";

export interface ResumeModel {
  id: string;
  isImport: boolean;
  isArchived: boolean;
  personalia: PersonaliaModel;
  introduction: string | undefined;
  projects: ExperienceModel[];
  experience: ExperienceModel[];
  skills: SkillModel[];
  languages: ResumeLanguage[] | LanguageProficiencyMap[];
  sideProjects: SideProjectModel[];
  publications: SideProjectModel[];
  education: EducationModel[];
  socialLinks: SocialLinkModel[];
  motivation: string | undefined;
  userId: string;
  lastUpdated: number;
}
