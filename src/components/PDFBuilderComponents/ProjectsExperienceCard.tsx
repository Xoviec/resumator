import { Fragment, VoidFunctionComponent } from "react";
import styled from "@react-pdf/styled-components";
import { PDFDescription } from "./PDFDescription";
import { formatDate, formatTimespan } from "../../lib/date";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";

const Root = styled.View`
  margin-bottom: 20px;
  width: 330px;
`;

const Header = styled.Text`
  color: #000;
  font-family: "Stratum";
  font-size: 10px;
`;
const SubText = styled.Text`
  color: #000;
  font-family: "Stratum";
  font-weight: 400;
  font-size: 8px;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 330px;
`;

const TechniquesWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #e0e0e0;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 330px;
  margin-top: 10px;
`;

const Plain = styled.Text`
  display: inline;
  font-size: 8px;
  color: #5a5b5e;
  margin-right: 3px;
  margin-left: 3px;
`;

interface ProjectsExperienceCardProps {
  project: ExperienceModel;
}

export const ProjectsExperienceCard: VoidFunctionComponent<ProjectsExperienceCardProps> =
  ({ project }) => {
    const { role, company, description, stackAndTechniques, startDate, endDate } =
      project;
    const shouldRenderTechniquesRow =
      !!project.stackAndTechniques && !!project.stackAndTechniques.length;
    const isEmpty =
      !role && !company && !startDate && !endDate && !shouldRenderTechniquesRow;

    return (
      <>
        {!isEmpty && (
          <Root wrap={true}>
            <Header>{role}</Header>
            <Flex wrap={false}>
              <SubText>{company}</SubText>
              <SubText>
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
