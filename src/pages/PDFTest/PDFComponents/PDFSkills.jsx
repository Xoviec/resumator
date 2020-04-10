import React from "react";
import { Text } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  background-color: #181626;
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const TextArea = styled.Text`
  color: #fff;
  font-size: 8px;
`;

const Header = styled.Text`
  color: #19c3c0;
`;
const SubHeader = styled.Text`
  color: #fff;
  font-size: 12px;
`;

export function PDFSkills({ introduction }) {
  return (
    <Root>
      <Header>SKILLS</Header>
      <SubHeader>LANGUAGES - FRAMEWORKS - LIBRARIES</SubHeader>
      <TextArea>{introduction}</TextArea>
    </Root>
  );
}
