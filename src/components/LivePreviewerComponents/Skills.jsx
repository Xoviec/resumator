import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import EditIcon from "./EditIcon";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Typography, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { skillsConstants } from "../../config/skills.constants";
import CustomChip from "./CustomChip";
import EmptyNotice from "./EmptyNotice";
import { createSkillObjects } from "./SkillsSelect";

function SkillsEditor({ skills, onNewSkillAdded }) {
  const renderSelectedSkills = (currentSkills, getTagProps) =>
    currentSkills.map((skill, index) => (
      <CustomChip
        key={skill}
        size="small"
        variant="outlined"
        label={skill}
        color="secondary"
        {...getTagProps({ index })}
      />
    ));

  const renderInput = (params) => (
    <TextField
      {...params}
      variant="outlined"
      placeholder="Add frameworks, libraries, technologies..."
    />
  );

  return (
    <Autocomplete
      multiple
      freeSolo
      fullWidth
      disableClearable
      disableCloseOnSelect
      options={skillsConstants}
      defaultValue={skills}
      renderTags={renderSelectedSkills}
      renderInput={renderInput}
    />
  );
}

const Skills = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsState, setSkillsState] = React.useState(
    skills.length > 0 ? skills.map((s) => s.name) : []
  );
  const onNewSkillAdded = (skill) =>
    setSkillsState((currentSkillsState) => [...currentSkillsState, skill]);

  const methods = useForm({});
  const reset = methods.reset;
  const getValues = methods.getValues;

  useEffect(() => {
    reset({});
  }, [skills, getValues, reset]);

  return (
    <StyledCard>
      <Typography gutterBottom variant="h4">
        Skills
      </Typography>
      <EditIcon
        className="add-new-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPen}
      />
      <SkillsContainer>
        {skills.map((s) => (
          <CustomChip
            key={s.name}
            size="small"
            variant="outlined"
            label={s.name}
            color="secondary"
          />
        ))}

        <EmptyNotice items={skills}>
          Click on the pen icon to add new skills
        </EmptyNotice>
      </SkillsContainer>

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit skills"
        heading="Skills"
        onPrimaryActionClicked={() => {
          onSubmit("skills", createSkillObjects(skillsState));
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset({});
          setIsEditing(false);
        }}
      >
        <SkillsEditor onNewSkillAdded={onNewSkillAdded} skills={skillsState} />
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

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

export default Skills;
