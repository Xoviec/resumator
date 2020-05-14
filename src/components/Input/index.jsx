import React from "react";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";

const Input = (props) => {
  return <StyledController {...props} />;
};

const StyledController = styled(Controller)`
  margin: 8px 0;
`;

export default Input;
