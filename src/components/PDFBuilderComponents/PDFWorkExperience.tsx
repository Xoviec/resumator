import styled from "@react-pdf/styled-components";
import { Fragment, VoidFunctionComponent } from "react";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";
import { PDFExperinceSection } from "./PDFExperinceSection";

const ViewWrapper = styled.View``;

const Hr = styled.View`
  width: 386px;
  opacity: 0.2;
  margin-bottom: 16px;
  border: 0.5px solid #000000;
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
      <PDFExperinceSection title="Work experience">
        {experience.map((project, i) => {
          return (
            <Fragment key={project.company + i}>
              {i >= 1 && <Hr />}
              <ProjectsExperienceCard project={project} />
            </Fragment>
          );
        })}
      </PDFExperinceSection>
    </ViewWrapper>
  );
};
