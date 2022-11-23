import { OutlinedInput, Select, SelectProps } from "@mui/material";
import { VoidFunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormSelectProps = SelectProps & {
  name: string;
};

export const FormSelect: VoidFunctionComponent<FormSelectProps> = ({
  name,
  defaultValue,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select
          fullWidth
          input={<OutlinedInput role="input" margin="dense" />}
          defaultValue={defaultValue}
          {...field}
          {...props}
        />
      )}
    />
  );
};
