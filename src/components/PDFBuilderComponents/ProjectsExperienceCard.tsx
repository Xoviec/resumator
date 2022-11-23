import styled from "@react-pdf/styled-components";
import { Fragment, VoidFunctionComponent } from "react";
import { formatTimespan } from "../../lib/date";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { PDFDescription } from "./PDFDescription";

const Root = styled.View`
  margin-bottom: 20px;
  width: 330px;
  color: #000;
  font-size: 10px;
`;

const Column = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Header = styled.Text`
  font-family: "TTCommonsPro";
  font-style: bold;
  font-weight: bold;
`;
const SubText = styled.Text`
  font-family: "Reckless";
  font-style: italic;
  font-weight: 400;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 330px;
`;

const TechniquesWrapper = styled.View`
  font-family: "Reckless";
  font-style: italic;
  font-weight: normal;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 330px;
  margin-top: 10px;
  margin-left: -3px;
`;

const Plain = styled.Text`
  display: inline;
  margin-right: 3px;
  margin-left: 3px;
`;

interface ProjectsExperienceCardProps {
  project: ExperienceModel;
}

export const ProjectsExperienceCard: VoidFunctionComponent<
  ProjectsExperienceCardProps
> = ({ project }) => {
  const { role, company, description, stackAndTechniques, startDate, endDate } =
    project;
  const shouldRenderTechniquesRow =
    !!project.stackAndTechniques && !!project.stackAndTechniques.length;
  const isEmpty =
    !role && !company && !startDate && !endDate && !shouldRenderTechniquesRow;

  return (
    <>
      {!isEmpty && (
        <Root>
          <Flex style={{ width: 383, marginBottom: 16 }}>
            <Column>
              <Header>{role}</Header>
              <SubText>{company}</SubText>
            </Column>
            <SubText
              style={{
                fontFamily: "TTCommonsPro",
                fontStyle: "normal",
                marginLeft: "auto",
              }}
            >
              {formatTimespan({
                startDate,
                endDate,
                dateFormat: "MMMM yyyy",
              })}
            </SubText>
          </Flex>
          <PDFDescription description={description} />
          {shouldRenderTechniquesRow && (
            <TechniquesWrapper wrap={false}>
              {stackAndTechniques.map((tech, index) => {
                const shouldAddHypen = index < stackAndTechniques.length - 1;
                return (
                  <Fragment key={tech.name}>
                    <Plain>{tech.name}</Plain>
                    {shouldAddHypen && <Plain>-</Plain>}
                  </Fragment>
                );
              })}
            </TechniquesWrapper>
          )}
        </Root>
      )}
    </>
  );
};
