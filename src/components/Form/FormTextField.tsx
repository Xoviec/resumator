import React, { FunctionComponent } from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useFormContext } from "react-hook-form";

export const FormTextField: FunctionComponent<TextFieldProps> = ({ ...props }) => {
  const { register } = useFormContext();

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      inputRef={register}
      {...props}
    />
  );
};