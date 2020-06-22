import React from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const InternCard = ({ children, ...props }) => {
  return (
    <CardContainer {...props}>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  position: relative;
  margin: 24px 0;
`;

export default InternCard;