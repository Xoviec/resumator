import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Input = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledController {...props} />
      {props.errors?.[props.name] && (
        <StyledError>{props.errors[props.name].message}</StyledError>
      )}
      {props.errors?.[props.name]?.type === "validate" && (
        <StyledError> {props.errorMessage}</StyledError>
      )}
    </MuiPickersUtilsProvider>
  );
};

const StyledController = styled(Controller)`
  margin: 8px 0;
`;
const StyledError = styled.span`
  color: red;
`;

export default Input;
