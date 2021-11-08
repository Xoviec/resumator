import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { TruncatedChip } from "../Material/TruncatedChip";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormSkillsSelect } from "../Form";

export interface SkillModel {
  name: string;
  isActive?: boolean;
}
interface SkillsProps {
  skills: SkillModel[];
  onSubmit: (skills: SkillModel[]) => void;
}

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState(skills);

  const handleSubmitData = useCallback(
    (data) => {
      const { skills } = data;
      // const mappedSkills = skills.map((skill: SkillModel) => ({
      //   ...skill,
      //   isActive: true,
      // }));

      setIsEditing(false);
      onSubmit(skills);
    },
    [onSubmit]
  );

  const handleChangeSkillStatus = useCallback(
    (skillName: string) => {
      const mappedSkills = skills.map((skill: SkillModel) => {
        if (skill.name === skillName) {
          return {
            ...skill,
            isActive: !skill.isActive,
          };
        }

        return skill;
      });

      setCards(mappedSkills);
      onSubmit(mappedSkills);
    },
    [skills, onSubmit]
  );

  useEffect(() => {
    setCards(skills);
  }, [skills]);

  return (
    <Section
      title="Skills"
      action="edit"
      actionTooltip="Edit skills"
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexWrap="wrap" gap="8px">
        {cards.map((skill, idx) => (
          <TruncatedChip
            key={skill?.name}
            label={skill?.name}
            isActive={skill.isActive}
            handleChangeSkillStatus={handleChangeSkillStatus}
          />
        ))}
      </Box>

      <SectionEditDialog
        title="Skills"
        data={{ skills }}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmitData}
      >
        <FormColumn>
          <FormRow>
            <FormSkillsSelect name="skills" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
