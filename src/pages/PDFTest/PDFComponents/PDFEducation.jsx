import React from "react";
import styled from "@react-pdf/styled-components";
import { View, Text } from "@react-pdf/renderer";

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

const Education = () => {
  return (
    <View>
      <Text>School</Text>
    </View>
  );
};
export function PDFEducation({ introduction }) {
  return (
    <Root wrap={false}>
      <Header>EDUCATION</Header>
      {introduction.map((edu) => {
        return <Text>{edu.institute}</Text>;
      })}
      <Education />
      <Education />
      <Education />
      <Education />
    </Root>
  );
}
