import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { Chip, TextField } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { skillsConstants } from "../../config/skills.constants";

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
  const handleDragEnd = ({ source, destination }) => {
    if (!source || !destination) return;

    // Not a full copy, but as we don't edit skills that should be okay.
    const skills = [...value];
    skills.splice(destination.index, 0, skills.splice(source.index, 1)[0]);

    onChange(skills);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="skill-list-droppable" direction="horizontal">
        {(provided) => (
          <div>
            <StyledAutocomplete
              multiple
              freeSolo
              disableClearable
              disableCloseOnSelect
              id="skill-list-autocomplete"
              ref={provided.innerRef}
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
                <Draggable draggableId={skill.name} index={index} key={skill.name}>
                  {(provided) => (
                    <StyledChip
                      ref={provided.innerRef}
                      label={skill.name}
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onDelete={() => handleSkillDelete(index)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
            />
            {/* Wrap the placeholder in a div to hide it as it messes with the layout */}
            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Style the autocomplete so that the input is placed below the chips.
const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-input {
    width: inherit;
  }
`;

// Make the chips have some space around them.
const StyledChip = styled(Chip)`
  margin: 0 8px 8px 0;
  background-color: #fff;
`;

export default SkillsSelect;
