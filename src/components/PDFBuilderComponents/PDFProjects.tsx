import styled from "@react-pdf/styled-components";
import { Fragment, VoidFunctionComponent } from "react";
import { ExperienceModel } from "../LivePreviewerComponents/ExperienceItem";
import { ProjectsExperienceCard } from "./ProjectsExperienceCard";
import { PDFExperinceSection } from "./PDFExperinceSection";

const ViewWrapper = styled.View`
  margin-top: 30px;
`;

const Hr = styled.View`
  width: 386px;
  opacity: 0.2;
  margin-bottom: 16px;
  border: 0.5px solid #000000;
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
    <ViewWrapper wrap>
      <PDFExperinceSection title="Projects via iO">
        {projects.map((project, i) => {
          return (
            <Fragment key={i}>
              {i >= 1 && <Hr />}
              <ProjectsExperienceCard project={project} />
            </Fragment>
          );
        })}
      </PDFExperinceSection>
    </ViewWrapper>
  );
};
