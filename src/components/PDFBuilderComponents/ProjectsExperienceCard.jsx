import React from "react";
import styled from "@react-pdf/styled-components";
import PDFDescription from "./PDFDescription";

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
  const arrayCount = stackAndTechniques ? stackAndTechniques.length - 1 : 0;

  if (arrayCount === 0) {
    return null;
  }

  return stackAndTechniques.map((project, index) => {
    return index < arrayCount ? (
      <React.Fragment key={project.name}>
        <Plain key={index}>{project.name}</Plain>
        <Plain>-</Plain>
      </React.Fragment>
    ) : (
      <Plain key={project.name}>{project.name}</Plain>
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
      <PDFDescription description={description} />
      <TechniquesWrapper>
        <Plain>Techniques:</Plain>
        {project ? renderStack(project) : null}
      </TechniquesWrapper>
    </Root>
  );
}
