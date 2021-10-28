import { VoidFunctionComponent } from "react";
import * as React from "react";
import { Chip, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { TruncatedChip } from "../Material/TruncatedChip";

interface Skill {
  name: string;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
  options: string[];
}

export const FormSkillsSelectAutocomplete: VoidFunctionComponent<FormSkillsSelectPropsAutocomplete> =
  ({ label, value, options }) => {
    console.log({ label, value, options });

    return (
      <Autocomplete
        fullWidth
        size="small"
        multiple
        id="skill-list-autocomplete"
        value={value.map((skill) => skill.name)}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          console.log("testtt");
          console.log({ newValue });
        }}
        options={options}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });

            return (
              <TruncatedChip
                key={key}
                label={option}
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
