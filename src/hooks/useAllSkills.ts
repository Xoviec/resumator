import { useContext } from "react";
import { SkillsContext } from "../context/SkillsContext/SkillsContext";

const useAllSkills = () => {
  const { skillList, updateSkillList, docId } = useContext(SkillsContext);

  return { skillList: skillList, updateSkillList: updateSkillList, docId: docId };
};

export default useAllSkills;
