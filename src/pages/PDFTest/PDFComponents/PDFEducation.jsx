import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
`;

export function PDFEducation({ introduction }) {
  return (
    <Root wrap={false}>
      <Header>EDUCATION</Header>
    </Root>
  );
}
