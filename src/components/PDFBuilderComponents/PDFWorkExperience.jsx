import React from "react";
import styled from "@react-pdf/styled-components";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";

const Root = styled.View`
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
  margin-bottom: 10px;
`;

export function PDFWorkExperience({ experience }) {
  if (!experience || !experience.length) {
    return null;
  }

  return (
    <Root wrap={true}>
      <Header>WORK EXPERIENCE</Header>
      {experience.map((project, i) => {
        return <ProjectsExperienceCard key={i} project={project} />;
      })}
    </Root>
  );
}
