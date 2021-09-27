import { ErrorMessage as FormErrorMessage } from "react-hook-form";
import { ErrorMessage, InputWrapper, StyledLabel } from "./styledComponents";

const FormField = ({ children, name, label }) => (
  <InputWrapper>
    {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
    {children}

    <FormErrorMessage name={name}>
      {({ message }) => <ErrorMessage>{message}</ErrorMessage>}
    </FormErrorMessage>
  </InputWrapper>
);

export default FormField;
