import React from "react";
import styled from "@emotion/styled";

const Card = ({ children, ...props }) => {
  return <CardContainer {...props}>{children}</CardContainer>;
};

const CardContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 24px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  margin: 24px 16px;
`;

export default Card;
