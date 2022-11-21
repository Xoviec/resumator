import styled from "@react-pdf/styled-components";
import { Fragment, VoidFunctionComponent } from "react";
import { SkillModel } from "../LivePreviewerComponents/Skills";
import { PDFExperinceSection } from "./PDFExperinceSection";

const ViewWrapper = styled.View`
  margin: 30px 0;
`;

const ColumnViewSkills = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-shrink: 0;
  flex-basis: 25%;
`;

const LiWrapper = styled.View`
  width: 386px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Li = styled.Text``;

const Space = styled.Text`
  margin-bottom: 15px;
`;

interface PDFSkillsProps {
  skills: SkillModel[];
}

export const PDFSkills: VoidFunctionComponent<PDFSkillsProps> = ({ skills }) => {
  if (!skills || !skills.length) {
    return null;
  }

  const devideSkillsToRows = skills
    .filter((skill) => skill.isActive)
    .reduce((acc, skill, index) => {
      if (index % 4 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(skill);
      return acc;
    }, [] as SkillModel[][]);

  return (
    <ViewWrapper>
      <PDFExperinceSection title="Skills">
        <LiWrapper>
          {devideSkillsToRows.map((row, idx) => (
            <Fragment key={idx}>
              <ColumnViewSkills>
                {idx >= 4 && <Space />}
                {row.map((skill, index) => {
                  return <Li key={skill.name + index}>{skill.name}</Li>;
                })}
              </ColumnViewSkills>
            </Fragment>
          ))}
        </LiWrapper>
      </PDFExperinceSection>
    </ViewWrapper>
  );
};
