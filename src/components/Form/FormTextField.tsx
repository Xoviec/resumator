import { useEffect, VoidFunctionComponent } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type FieldProps = TextFieldProps & { name: string; required?: boolean };

export const FormTextField: VoidFunctionComponent<FieldProps> = ({
  name,
  required = true,
  ...props
}) => {
  const { register, resetField } = useFormContext();

  useEffect(() => () => resetField(name), [resetField, name]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      {...register(name, { required })}
      {...props}
    />
  );
};
