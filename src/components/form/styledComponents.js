import styled from "@emotion/styled";
import { Label } from "@rebass/forms";

export const FormGroup = styled.fieldset`
  margin-bottom: 2rem;
  border: 0;
  padding: 0;
`;

export const InputWrapper = styled.div`
  margin-top: 1rem;
`;

export const StyledLabel = styled(Label)`
  margin-bottom: 0.25rem;
`;

export const ErrorMessage = styled.label`
  display: block;
  padding-top: 0.25rem;
  color: tomato;
`;
