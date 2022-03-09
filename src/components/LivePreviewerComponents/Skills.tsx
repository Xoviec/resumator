import { HelpSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormColumn, FormRow, FormSkillsSelect } from "../Form";
// components
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { SkillChip } from "./SkillChip";

export interface SkillModel {
  name: string;
  isActive?: boolean;
}
export interface SkillsProps {
  skills: SkillModel[];
  onSubmit: (skills: SkillModel[]) => void;
}

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState(skills);

  const handleSubmitData = useCallback(
    (data) => {
      const { skills } = data;
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
      tooltipTitle="Click a skill to show/hide them in the PDF resume"
      tooltipIcon={<HelpSharp />}
    >
      <Box display="flex" flexWrap="wrap" gap="8px">
        {cards.map((skill, idx) => (
          <SkillChip
            key={skill?.name}
            label={skill?.name}
            isActive={skill.isActive}
            onActiveChange={handleChangeSkillStatus}
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
