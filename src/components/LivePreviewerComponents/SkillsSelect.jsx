import React from "react";
import { TextField, InputLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Chip from "@material-ui/core/Chip";
import { skillsConstants } from "../../config/skills.constants";

const AUTOCOMPLETE_REASONS = {
  ADD: "select-option", // Added via dropdown/select options
  CREATE: "create-option", // Added via typing
  REMOVE: "remove-option",
};

const SkillsSelect = ({ value, onChange, label }) => {
  const renderSelectedSkills = (currentSkills, getTagProps) =>
    currentSkills.map(({ name }, index) => (
      <Chip
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

  const onAutocompleteChange = (event, inputValue, reason) => {
    if (reason === AUTOCOMPLETE_REASONS.REMOVE) {
      onChange(inputValue);

      return inputValue;
    }

    if (
      reason === AUTOCOMPLETE_REASONS.ADD ||
      reason === AUTOCOMPLETE_REASONS.CREATE
    ) {
      const skills = [...inputValue];
      const addedSkill = skills.pop();

      skills.push({ name: addedSkill });
      onChange(skills);

      return skills;
    }

    return inputValue;
  };

  const getOptionSelected = (option, skill) => option === skill.name;

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
        getOptionSelected={getOptionSelected}
      />
    </>
  );
};

export default SkillsSelect;
