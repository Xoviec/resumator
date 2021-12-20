import { SkillModel } from "../components/LivePreviewerComponents/Skills";
/**
 * Append new skills
 * @param skills existing skills
 * @param newSkills new added skill from project/work experience
 * @returns {SkillModel} skills
 */
export const appendSkills = (
  skills: SkillModel[],
  newSkills: SkillModel[]
): SkillModel[] => {
  newSkills.forEach((newSkill) => {
    const isExist = skills.some(({ name }) => name === newSkill.name);
    if (!isExist) {
      skills.push({ ...newSkill, isActive: false });
    }
  });
  return skills;
};
