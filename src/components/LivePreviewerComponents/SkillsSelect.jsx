import React from "react";
import CustomChip from "./CustomChip";
import { skillsConstants } from "../../config/skills.constants";
import { TextField, InputLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const SkillsSelect = ({ skills, onSkillsChanged, label }) => {
  const renderSelectedSkills = (currentSkills, getTagProps) =>
    currentSkills.map(({ name }, index) => (
      <CustomChip
        key={name}
        label={name}
        size="small"
        variant="outlined"
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

  const onChange = (event, inputValue) => {
    const skills = [...inputValue];
    const addedSkill = skills.pop();

    skills.push({ name: addedSkill });

    onSkillsChanged(skills);
  };

  return (
    <>
      {label && <InputLabel id="skill-label">{label}</InputLabel>}

      <Autocomplete
        id="skill-list-autocomplete"
        multiple
        freeSolo
        fullWidth
        disableClearable
        disableCloseOnSelect
        options={skillsConstants}
        value={skills}
        renderTags={renderSelectedSkills}
        renderInput={renderInput}
        onChange={onChange}
      />
    </>
  );
};

export default SkillsSelect;
