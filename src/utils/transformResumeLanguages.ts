import { Language, LanguageProficiencyMap, Proficiency } from "../types/language";

// Transform languageId and proficiencyId given from the backend to the correct language and proficiency object
export const transformResumeLanguages = (
  availableLanguages: Language[],
  availableProficiencies: Proficiency[],
  resumeLanguages: LanguageProficiencyMap[]
) => {
  const transformedLanguages = resumeLanguages.map(
    ({ languageId, proficiencyId }) => {
      const transformedLanguage = availableLanguages.find(
        (availableLanguage) => availableLanguage.id === languageId
      );

      const transformedProficiency = availableProficiencies.find(
        (availableProficiency) => {
          return availableProficiency.id === proficiencyId;
        }
      );

      return {
        language: transformedLanguage,
        proficiency: transformedProficiency,
      };
    }
  );

  return transformedLanguages;
};
