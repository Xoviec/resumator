import { VoidFunctionComponent } from "react";
import * as React from "react";
import { Chip, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { TruncatedChip } from "../Material/TruncatedChip";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";

interface Skill {
  name: string;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const FormSkillsSelectAutocomplete: VoidFunctionComponent<FormSkillsSelectPropsAutocomplete> =
  ({ label, value, onChange }) => {
    const { skillList, updateSkillList } = useSkillsContext();

    const autocompleteValue = value.map((skill) => ({
      name: skill.name,
      label: skill.name,
      isNew: false,
    }));

    const autocompleteSkillList = skillList.map((skill) => ({
      name: skill,
      label: skill,
      isNew: false,
    }));

    return (
      <Autocomplete
        fullWidth
        size="small"
        multiple
        id="skill-list-autocomplete"
        value={autocompleteValue}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          const skillsToAdd = newValue
            .filter((skill) => skill.isNew)
            .map((skill) => skill.name);

          onChange(newValue.map((skill) => ({ name: skill.name })));

          if (skillsToAdd.length > 0) {
            // this function already makes sure we have a unique list of skills, no need to check for duplicates
            updateSkillList([...skillList, ...skillsToAdd]);
          }
        }}
        filterOptions={(options, params) => {
          return options;
        }}
        options={autocompleteSkillList}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });

            return (
              <TruncatedChip
                key={key}
                label={option.label}
                sx={{ margin: 5 }}
                {...tagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            label={label}
            placeholder="Add a library, framework, skill..."
          />
        )}
      />
    );
  };
