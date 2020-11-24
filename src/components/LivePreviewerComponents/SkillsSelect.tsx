import React, { FunctionComponent } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "@emotion/styled";
import { skillsConstants } from "../../config/skills.constants";
import SkillsSelectChip from "./SkillsSelectChip";

interface Skill {
  name: string;
}

interface SkillsSelectProps {
  value: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsSelect: FunctionComponent<SkillsSelectProps> = ({ value, onChange }) => {
  /**
   * Check if the provided option is currently included in the skills.
   */
  const getOptionSelected = (option: string, skill: string) => option === skill;

  /**
   * Handle adding or deleting a skill through the autocomplete input.
   */
  const handleSkillChange = (event: object, inputValue: string[], reason: string) => {
    const skills = inputValue.map(name => ({ name }));
    onChange(skills);
  }

  /**
   * Handle deleting a skill by clicking the x on the chip.
   */
  const handleSkillDelete = (index: number) => onChange(value.filter((skill, i) => index !== i));

  /**
   * Handle when a skill is being dropped in a new position.
   */
  const handleDrag = (sourceIndex: number, destinationIndex: number) => {
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
        value={value.map(skill => skill.name)}
        options={skillsConstants}
        onChange={handleSkillChange}
        getOptionSelected={getOptionSelected}
        renderInput={(params: object) => (
          <TextField
            // variant="outlined"
            placeholder="Add a library, framework, skill..."
            {...params}
          />
        )}
        renderTags={(value: string[]) => value.map((skill, index) => (
          // Add a chip for each skill.
          <SkillsSelectChip
            key={skill}
            label={skill}
            index={index}
            onDrag={handleDrag}
            onDelete={handleSkillDelete}
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
` as typeof Autocomplete;

export default SkillsSelect;
