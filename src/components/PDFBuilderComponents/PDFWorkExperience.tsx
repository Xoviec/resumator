import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";

const Root = styled.View`
  padding: 20px;
  margin-bottom: 20px;
  width: 350px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 8px;
  margin-bottom: 10px;
`;

interface PDFWorkExperienceProps {
  experience: ExperienceModel[];
}

export const PDFWorkExperience: VoidFunctionComponent<PDFWorkExperienceProps> = ({
  experience,
}) => {
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
};
