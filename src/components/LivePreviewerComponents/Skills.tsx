import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import { Chip } from "@material-ui/core";
import SkillsSelectFormField from "./SkillsSelectFormField";
import { Section } from "./Section";

interface SkillsProps {
  skills: { name: string }[];
  onSubmit: (key: string, values: any) => void;
}

const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
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
      <SkillsContainer>
        {skills.map((skill) => (
          <CustomChip
            key={skill.name}
            size="small"
            variant="outlined"
            label={skill.name}
            color="secondary"
          />
        ))}
      </SkillsContainer>

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

const CHIP_GUTTER = 8;
const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -${CHIP_GUTTER}px;
  margin-left: -${CHIP_GUTTER}px;
`;

const CustomChip = styled(Chip)`
  margin-left: ${CHIP_GUTTER}px;
  margin-top: ${CHIP_GUTTER}px;
`;

export default Skills;
