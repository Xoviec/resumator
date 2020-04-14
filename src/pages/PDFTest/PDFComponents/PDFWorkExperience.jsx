import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
`;

export function PDFWorkExperience({ introduction }) {
  return (
    <Root wrap={false}>
      <Header>WORK EXPERIENCE</Header>
    </Root>
  );
}
