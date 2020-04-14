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
  margin-bottom: 20px;
`;

export function PDFWorkExperience({ introduction }) {
  return (
    <Root wrap={true}>
      <Header>WORK EXPERIENCE</Header>
      {introduction.map((item) => {
        return <ProjectsExperienceCard item={item} />;
      })}
    </Root>
  );
}
