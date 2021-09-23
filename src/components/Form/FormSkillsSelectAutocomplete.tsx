import React, { FunctionComponent } from "react";
import { Autocomplete, AutocompleteChangeReason } from "@material-ui/lab";
import { makeStyles, TextField } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormSkillsSelectChip from "./FormSkillsSelectChip";

interface Skill {
  name: string;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
  options: string[];
}

const useStyles = makeStyles({
  autocomplete: {
    // Make sure the input is below the chips.
    "& .MuiAutocomplete-input": {
      width: "inherit",
    },
  },
  textField: {
    "& input": {
      marginTop: "4px",
    },
  },
});

const FormSkillsSelectAutocomplete: FunctionComponent<FormSkillsSelectPropsAutocomplete> =
  ({ label, value, onChange, options }) => {
    const classes = useStyles();
    /**
     * Check if the provided option is currently included in the skills.
     */
    const getOptionSelected = (option: string, skill: string) => option === skill;

    /**
     * Handle adding or deleting a skill through the autocomplete input.
     */
    const handleSkillChange = (
      event: React.ChangeEvent<Record<string, unknown>>,
      inputValue: string[],
      reason: AutocompleteChangeReason
    ) => {
      const skills = inputValue.map((name) => ({ name }));
      onChange(skills);
    };

    /**
     * Handle deleting a skill by clicking the x on the chip.
     */
    const handleSkillDelete = (index: number) =>
      onChange(value.filter((skill, i) => index !== i));

    /**
     * Handle when a skill is being dropped in a new position.
     */
    const handleDrag = (sourceIndex: number, destinationIndex: number) => {
      // Not a full copy, but as we don't edit skills that should be okay.
      const skills = [...value];
      skills.splice(destinationIndex, 0, skills.splice(sourceIndex, 1)[0]);

      onChange(skills);
    };

    return (
      <DndProvider backend={HTML5Backend}>
        <Autocomplete
          fullWidth
          multiple
          disableClearable
          disableCloseOnSelect
          id="skill-list-autocomplete"
          size="small"
          className={classes.autocomplete}
          value={value.map((skill) => skill.name)}
          options={options}
          onChange={handleSkillChange}
          getOptionSelected={getOptionSelected}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Add a library, framework, skill..."
              className={value.length ? classes.textField : undefined}
              label={label}
              {...params}
            />
          )}
          renderTags={(value: string[]) =>
            value.map((skill, index) => (
              // Add a chip for each skill.
              <FormSkillsSelectChip
                key={skill}
                label={skill}
                index={index}
                onDrag={handleDrag}
                onDelete={handleSkillDelete}
              />
            ))
          }
        />
      </DndProvider>
    );
  };

export default FormSkillsSelectAutocomplete;
