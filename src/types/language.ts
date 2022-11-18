export type Proficiency = {
  id: string;
  name: string;
  description: string;
};

export type Language = {
  id: string;
  name: string;
};

export type ResumeLanguage = {
  proficiency?: Proficiency;
  language?: Language;
};

export type LanguageProficiencyMap = {
  languageId?: string;
  proficiencyId?: string;
};

export enum ProficiencyLevel {
  Beginner = "Beginner",
  Proficient = "Proficient",
  Intermediate = "Intermediate",
  Fluent = "Fluent",
  Native = "Native",
}
