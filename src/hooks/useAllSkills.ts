import { useContext } from "react";
import { SkillsContext } from "../context/SkillsContext/SkillsContext";

const useAllSkills = () => {
  const { skillList, updateSkillList } = useContext(SkillsContext);

  return { skillList, updateSkillList };
};

export default useAllSkills;
