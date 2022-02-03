import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";

const Root = styled.View`
  padding: 20px;
  width: 350px;
  margin-bottom: -40px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
  margin-bottom: 12px;
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
    <Root wrap={true}>
      <Header>PROJECTS</Header>
      {projects.map((project, index) => {
        return (
          <ProjectsExperienceCard key={`project.id-${index}`} project={project} />
        );
      })}
    </Root>
  );
};
