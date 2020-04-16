import styled from "@emotion/styled";
import { Label } from "@rebass/forms";

export const FormGroup = styled.fieldset`
  background-color: #12111d;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 0;
`;

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledLabel = styled(Label)`
  margin-bottom: 0.25rem;
`;

export const ErrorMessage = styled.label`
  display: block;
  padding-top: 0.25rem;
  color: tomato;
`;
