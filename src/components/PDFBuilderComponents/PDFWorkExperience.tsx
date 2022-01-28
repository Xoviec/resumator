import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";
import { PDFSection } from "./PDFSection";

const ViewWrapper = styled.View`
  margin-top: 30px;
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
    <ViewWrapper>
      <PDFSection title="Work experience">
        {experience.map((project, i) => {
          return <ProjectsExperienceCard key={i} project={project} />;
        })}
      </PDFSection>
    </ViewWrapper>
  );
};
