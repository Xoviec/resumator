import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  margin-bottom: 20px;
  width: 300px;
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
  font-size: 8px;
  width: 280px;
  margin-top: 6px;
`;

const TechniquesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 300px;
  margin-top: 6px;
`;

const Plain = styled.Text`
  font-size: 8px;
  color: #5a5b5e;
  margin-right: 3px;
  margin-left: 3px;
`;

const renderStack = ({ stackAndTechniques }) => {
  const arrayCount = stackAndTechniques.length - 1;
  return stackAndTechniques.map((project, index) => {
    return index < arrayCount ? (
      <>
        <Plain>{project}</Plain>
        <Plain>-</Plain>
      </>
    ) : (
      <Plain>{project}</Plain>
    );
  });
};

export function ProjectsExperienceCard({ project }) {
  const { role, company, description } = project;
  return (
    <Root wrap={false}>
      <Header>{role}</Header>
      <Flex>
        <SubText>{company}</SubText>
        <SubText>March 2016 - December 2018</SubText>
      </Flex>
      <TextArea>{description}</TextArea>
      <TechniquesWrapper>
        <Plain>Techniques:</Plain>
        {project ? renderStack(project) : null}
      </TechniquesWrapper>
    </Root>
  );
}
