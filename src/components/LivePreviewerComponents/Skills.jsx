import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Chip, Typography } from "@material-ui/core";
import Card from "../Card";
import EmptyNotice from "./EmptyNotice";
import ActionIcon from "./ActionIcon";
import SkillsSelectFormField from "./SkillsSelectFormField";

const Skills = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsState, setSkillsState] = useState(skills || []);
  const methods = useForm();
  const { reset, control, getValues } = methods;

  useEffect(() => {
    reset({});
  }, [skills, reset]);

  return (
    <StyledCard>
      <TopWrapper>
        <Typography gutterBottom variant="h4">
          Skills
        </Typography>

        <ActionIcon
          onClick={() => setIsEditing(true)}
          icon={faPen}
          tooltipText="Edit skills"
        />
      </TopWrapper>

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

      <EmptyNotice show={skills.length === 0} icon={faPen} />

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit skills"
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
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  &:hover {
    .add-new-button {
      visibility: visible;
    }
  }
`;

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

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Skills;
