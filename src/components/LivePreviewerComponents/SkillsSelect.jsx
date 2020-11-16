import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "@emotion/styled";
import { skillsConstants } from "../../config/skills.constants";
import SkillsSelectChip from "./SkillsSelectChip";

const AUTOCOMPLETE_REASONS = {
  ADD: "select-option", // Added via dropdown/select options
  CREATE: "create-option", // Added via typing
  REMOVE: "remove-option",
};

const SkillsSelect = ({ value, onChange }) => {
  /**
   * Check if the provided option is currently included in the skills.
   */
  const getOptionSelected = (option, skill) => option === skill.name;

  /**
   * Handle adding or deleting a skill through the autocomplete input.
   */
  const handleSkillChange = (event, inputValue, reason) => {
    if (reason === AUTOCOMPLETE_REASONS.ADD || reason === AUTOCOMPLETE_REASONS.CREATE) {
      // Not a full copy, but as we don't edit skills that should be okay.
      const skills = [...inputValue];
      skills.push({ name: skills.pop() });
      onChange(skills);
    }

    if (reason === AUTOCOMPLETE_REASONS.REMOVE) {
      onChange(inputValue);
    }
  }

  /**
   * Handle deleting a skill by clicking the x on the chip.
   */
  const handleSkillDelete = (index) => onChange(value.filter((skill, i) => index !== i));

  /**
   * Handle when a skill is being dropped in a new position.
   */
  const handleDrag = (sourceIndex, destinationIndex) => {
    // Not a full copy, but as we don't edit skills that should be okay.
    const skills = [...value];
    skills.splice(destinationIndex, 0, skills.splice(sourceIndex, 1)[0]);

    onChange(skills);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledAutocomplete
        multiple
        freeSolo
        disableClearable
        disableCloseOnSelect
        id="skill-list-autocomplete"
        value={value}
        options={skillsConstants}
        onChange={handleSkillChange}
        getOptionSelected={getOptionSelected}
        renderInput={(params) => (
          <TextField
            // variant="outlined"
            placeholder="Add a library, framework, skill..."
            {...params}
          />
        )}
        renderTags={(value) => value.map((skill, index) => (
          // Add a chip for each skill.
          <SkillsSelectChip
            key={skill.name}
            label={skill.name}
            index={index}
            onDrag={handleDrag}
            onDelete={() => handleSkillDelete(index)}
          />
        ))}
      />
    </DndProvider>
  );
};

// Style the autocomplete so that the input is placed below the chips.
const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-input {
    width: inherit;
  }
`;

export default SkillsSelect;
