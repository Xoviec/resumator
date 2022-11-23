import { FormControlProps } from "@mui/material";
import { useEffect, VoidFunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormSkillsSelectAutocomplete } from "./FormSkillsSelectAutocomplete";

interface FormSkillsSelectProps extends FormControlProps {
  name: string;
  label?: string;
}

export const FormSkillsSelect: VoidFunctionComponent<FormSkillsSelectProps> = ({
  name,
  label,
  ...props
}) => {
  const { control, resetField } = useFormContext();

  useEffect(() => () => resetField(name), [resetField, name]);

  return (
    <Controller
      defaultValue={[]}
      control={control}
      name={name!}
      render={({ field: { onChange, value } }) => (
        <FormSkillsSelectAutocomplete
          {...props}
          label={label}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};
