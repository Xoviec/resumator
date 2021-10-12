import { VoidFunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlProps } from "@mui/material";
import FormSkillsSelectAutocomplete from "./FormSkillsSelectAutocomplete";

interface FormSkillsSelectProps extends FormControlProps {
  name: string;
  label?: string;
  options: string[];
}

export const FormSkillsSelect: VoidFunctionComponent<FormSkillsSelectProps> = ({
  name,
  label,
  options,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue={[]}
      control={control}
      name={name!}
      render={({ value, onChange }) => (
        <FormSkillsSelectAutocomplete
          {...props}
          label={label}
          value={value}
          options={options}
          onChange={onChange}
        />
      )}
    />
  );
};
