import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { formatTimespan } from "../../lib/date";
import { EducationModel } from "../LivePreviewerComponents/EducationItem";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 10px;
  font-family: "TTCommonsPro";
`;

const DegreeText = styled.Text`
  font-size: 10px;
  font-family: "Reckless";
`;
const CollegeText = styled.Text`
  font-size: 8px;
`;

const Wrapper = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

interface EducationProps {
  education: EducationModel;
}

const Education: VoidFunctionComponent<EducationProps> = ({
  education: { name, institute, endDate, startDate },
}) => {
  return (
    <Wrapper>
      <DegreeText>{name}</DegreeText>
      <CollegeText>{institute}</CollegeText>
      <CollegeText>
        {formatTimespan({
          startDate,
          endDate,
          showEndYear: true,
          dateFormat: "MMMM yyyy",
        })}
      </CollegeText>
    </Wrapper>
  );
};

interface PDFEducationProps {
  education: EducationModel[];
}

export const PDFEducation: VoidFunctionComponent<PDFEducationProps> = ({
  education,
}) => {
  if (!education || !education.length) {
    return null;
  }

  return (
    <Root wrap={false}>
      <Header>EDUCATION</Header>
      {education.map((education, i) => {
        return <Education key={i} education={education} />;
      })}
    </Root>
  );
};
