import React from "react";
import { ErrorMessage as FormErrorMessage } from "react-hook-form";
import { ErrorMessage, InputWrapper, StyledLabel } from "./styledComponents";

const FormField = ({ children, name, label, errors }) => {
  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      {children}

      <FormErrorMessage errors={errors} name={name}>
        {({ message }) => <ErrorMessage>{message}</ErrorMessage>}
      </FormErrorMessage>
    </InputWrapper>
  );
};

export default FormField;
