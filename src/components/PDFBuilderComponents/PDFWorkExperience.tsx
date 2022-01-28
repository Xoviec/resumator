import styled from "@react-pdf/styled-components";
import { Fragment, VoidFunctionComponent } from "react";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";
import { PDFSection } from "./PDFSection";

const ViewWrapper = styled.View`
  margin-top: 30px;
`;

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
      <PDFSection title="Work experience">
        {experience.map((project, i) => {
          if (i >= 2) {
            return (
              <Fragment key={i}>
                <Hr />
                <ProjectsExperienceCard project={project} />
              </Fragment>
            );
          }
          return <ProjectsExperienceCard key={i} project={project} />;
        })}
      </PDFSection>
    </ViewWrapper>
  );
};
