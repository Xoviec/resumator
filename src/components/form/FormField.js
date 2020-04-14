import React from "react";
import { ErrorMessage, InputWrapper, StyledLabel } from "./styledComponents";

const FormField = ({ children, name, label, errors }) => {
  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      {children}
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default FormField;
