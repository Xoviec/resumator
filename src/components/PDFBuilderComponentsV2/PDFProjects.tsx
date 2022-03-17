import { View, Text } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { formatTimespan } from "../../lib";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { PDFDescription } from "./PDFDescription";

const Project = styled(View)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ProjectHeader = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`;

const BaseText = styled(Text)`
  font-family: "TTCommonsPro";
  color: #000;
  font-size: 9px;
`;

const RoleText = styled(BaseText)`
  font-weight: bold;
`;

const TextSeparator = styled(BaseText)`
  margin: 0 2px;
`;

interface PDFProjectsProps {
  projects: ExperienceModel[];
}

export const PDFProjects: VoidFunctionComponent<PDFProjectsProps> = ({
  projects,
}) => {
  if (!projects || !projects.length) {
    return null;
  }

  return (
    <View>
      {projects.map((project, index) => {
        return (
          <Project key={index}>
            <ProjectHeader>
              <RoleText>{project.role}</RoleText>
              <TextSeparator>-</TextSeparator>
              <BaseText>
                {`${project.company} (${formatTimespan({
                  startDate: project.startDate,
                  endDate: project.endDate,
                  dateFormat: "MMMM yyyy",
                })})`}
              </BaseText>
            </ProjectHeader>
            <View>
              <PDFDescription description={project.description} />
            </View>
          </Project>
        );
      })}
    </View>
  );
};
