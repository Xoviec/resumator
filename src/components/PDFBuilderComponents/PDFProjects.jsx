import React from "react";
import styled from "@react-pdf/styled-components";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";

const Root = styled.View`
  padding: 20px;
  width: 200px;
  margin-bottom: -40px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
  margin-bottom: 12px;
`;

export function PDFProjects({ projects }) {
  return (
    <Root wrap={true}>
      <Header>PROJECTS</Header>
      {projects.map((project) => {
        return <ProjectsExperienceCard project={project} />;
      })}
    </Root>
  );
}
