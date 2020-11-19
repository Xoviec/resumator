import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import { Box, Chip } from "@material-ui/core";
import SkillsSelectFormField from "./SkillsSelectFormField";
import { Section } from "./Section";

interface SkillsProps {
  skills: { name: string }[];
  onSubmit: (key: string, values: any) => void;
}

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsState, setSkillsState] = useState(skills || []);
  const methods = useForm();
  const { reset, control, getValues } = methods;

  useEffect(() => {
    reset({});
  }, [skills, reset]);

  return (
    <Section
      title="Skills"
      action="edit"
      actionTooltip="Edit skills"
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexWrap="wrap" gridGap={8}>
        {skills.map((skill) => (
          <Chip
            key={skill.name}
            size="small"
            variant="outlined"
            label={skill.name}
            color="secondary"
          />
        ))}
      </Box>

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        // contentLabel="Edit skills"
        heading="Skills"
        onPrimaryActionClicked={() => {
          const { skills } = getValues();

          onSubmit("skills", skills);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset({});
          setSkillsState(skills);
          setIsEditing(false);
        }}
      >
        <SkillsSelectFormField
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          formControl={control}
          formRules={{ required: true }}
          name="skills"
        />
      </EditModalWrapper>
    </Section>
  );
};
