import React from "react";
import styled from "@react-pdf/styled-components";
import { Document, PDFViewer, Text } from "@react-pdf/renderer";

const Root = styled.View`
  margin-bottom: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #000;
  font-family: "Stratum";
  font-size: 10px;
`;
const SubText = styled.Text`
  color: #000;
  font-family: "Stratum";
  font-size: 10px;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
`;

const TextArea = styled.Text`
  font-size: 6px;
  width: 300px;
  margin-top: 6px;
`;

export function ProjectsExperienceCard(props) {
  return (
    <Root wrap={false}>
      <Header>{props.item.role}</Header>
      <Flex>
        <SubText>{props.item.company}</SubText>
        <SubText>March 2016 - December 2018</SubText>
      </Flex>
      <TextArea>{props.item.description}</TextArea>
      {props.item.stackAndTechniques.map((stack) => {
        return <Text>{stack}</Text>;
      })}
    </Root>
  );
}
