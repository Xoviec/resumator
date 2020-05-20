import React from "react";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Input = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledController {...props} />
    </MuiPickersUtilsProvider>
  );
};

const StyledController = styled(Controller)`
  margin: 8px 0;
`;

export default Input;
