import React from "react";
import styled from "@react-pdf/styled-components";
import PDFDescription from "./PDFDescription";
import { formatDate } from "../../lib/date";

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
  flex-wrap: wrap;
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

const renderStack = (stackAndTechniques) =>
  stackAndTechniques.map((tech, index) => {
    const shouldAddHypen = index < stackAndTechniques.length - 1;
    return (
      <React.Fragment key={tech.name}>
        <Plain>{tech.name}</Plain>
        {shouldAddHypen && <Plain>-</Plain>}
      </React.Fragment>
    );
  });

export function ProjectsExperienceCard({ project }) {
  const {
    role,
    company,
    description,
    stackAndTechniques,
    startDate,
    endDate,
  } = project;
  const startDateFormatted = startDate ? formatDate(startDate, "MMMM yyyy") : "";
  const endDateFormatted = endDate ? formatDate(endDate, "MMMM yyyy") : "";
  const shouldRenderTechniquesRow =
    !!project.stackAndTechniques && !!project.stackAndTechniques.length;

  return (
    <Root wrap={true}>
      <Header>{role}</Header>
      <Flex>
        <SubText>{company}</SubText>
        <SubText>
          {startDateFormatted} - {endDateFormatted}
        </SubText>
      </Flex>
      <PDFDescription description={description} />
      {shouldRenderTechniquesRow && (
        <TechniquesWrapper>
          <Plain>Techniques:</Plain>
          {renderStack(stackAndTechniques)}
        </TechniquesWrapper>
      )}
    </Root>
  );
}
