import { useCallback, useMemo, VoidFunctionComponent } from "react";
import { TextField } from "@mui/material";
import { TruncatedChip } from "../Material/TruncatedChip";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import Autocomplete, {
  createFilterOptions,
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";

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

type AutocompleteProps = MuiAutocompleteProps<AutocompleteSkill, true, true, false>;

const filter = createFilterOptions<AutocompleteSkill>();

export const FormSkillsSelectAutocomplete: VoidFunctionComponent<FormSkillsSelectPropsAutocomplete> =
  ({ label, value, onChange }) => {
    const { skillList, updateSkillList } = useSkillsContext();

    const renderTags = useCallback<NonNullable<AutocompleteProps["renderTags"]>>(
      (tagValue, getTagProps) =>
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
        }),
      []
    );

    const renderInput = useCallback<NonNullable<AutocompleteProps["renderInput"]>>(
      (params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label={label}
          placeholder="Add a library, framework, skill..."
        />
      ),
      [label]
    );

    const filterOptions = useCallback<
      NonNullable<AutocompleteProps["filterOptions"]>
    >((options, params) => {
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
    }, []);

    const onChangeHandler = useMemo<
      NonNullable<AutocompleteProps["onChange"]>
    >(() => {
      return async (event, newValue) => {
        const skillsToAdd = newValue
          .filter((skill) => skill.isNew)
          .map((skill) => skill.name);

        if (skillsToAdd.length > 0) {
          // this function already makes sure we have a unique list of skills, no need to check for duplicates
          await updateSkillList([...skillList, ...skillsToAdd]);
        }

        onChange(newValue.map((skill) => ({ name: skill.name })));
      };
    }, [onChange, skillList, updateSkillList]);

    const isOptionEqualToValue = useCallback<
      NonNullable<AutocompleteProps["isOptionEqualToValue"]>
    >((option, value) => option.name === value.name, []);

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
        isOptionEqualToValue={isOptionEqualToValue}
        disableCloseOnSelect
        autoHighlight
        onChange={onChangeHandler}
        filterOptions={filterOptions}
        options={autocompleteSkillList}
        renderTags={renderTags}
        renderInput={renderInput}
      />
    );
  };
