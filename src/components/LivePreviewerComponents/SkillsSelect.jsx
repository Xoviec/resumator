import React from "react";
import CustomChip from "./CustomChip";
import { skillsConstants } from "../../config/skills.constants";
import { TextField, InputLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const SkillsSelect = ({ value, onChange, label }) => {
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

  const onAutocompleteChange = (event, inputValue) => {
    const wasSkillRemoved = inputValue.length < value.length;

    if (wasSkillRemoved) {
      onChange(inputValue);

      return inputValue;
    }

    const skills = [...inputValue];
    const addedSkill = skills.pop();

    skills.push({ name: addedSkill });
    onChange(skills);

    return skills;
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
        value={value}
        renderTags={renderSelectedSkills}
        renderInput={renderInput}
        onChange={onAutocompleteChange}
      />
    </>
  );
};

export default SkillsSelect;
