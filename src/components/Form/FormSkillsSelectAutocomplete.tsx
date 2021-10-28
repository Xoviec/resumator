import { VoidFunctionComponent } from "react";
import { TextField } from "@mui/material";
import { TruncatedChip } from "../Material/TruncatedChip";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

interface Skill {
  name: string;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
}

interface AutocompleteSkill {
  name: string;
  label: string;
  isNew: boolean;
}

const filter = createFilterOptions<AutocompleteSkill>();

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
        handleHomeEndKeys
        id="skill-list-autocomplete"
        value={autocompleteValue}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        disableCloseOnSelect
        autoHighlight
        onChange={async (event, newValue) => {
          const skillsToAdd = newValue
            .filter((skill) => skill.isNew)
            .map((skill) => skill.name);

          if (skillsToAdd.length > 0) {
            // this function already makes sure we have a unique list of skills, no need to check for duplicates
            await updateSkillList([...skillList, ...skillsToAdd]);
          }

          onChange(newValue.map((skill) => ({ name: skill.name })));
        }}
        filterOptions={(options, params) => {
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue.toLowerCase() === option.name.toLowerCase()
          );
          if (inputValue !== "" && !isExisting) {
            return [
              ...filter(options, params),
              {
                name: inputValue,
                label: `Add "${inputValue}"`,
                isNew: true,
              },
            ];
          } else {
            return filter(options, params);
          }
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
