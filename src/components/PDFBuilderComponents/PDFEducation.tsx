import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent, Fragment } from "react";
import { formatTimespan } from "../../lib/date";
import { EducationModel } from "../LivePreviewerComponents/EducationItem";

const RightView = styled.View``;

const Header = styled.Text`
  font-size: 10px;
  font-family: "TTCommonsPro";
  font-weight: bold;
  font-style: bold;
  color: #fff;
`;

const DegreeText = styled.Text`
  font-family: "TTCommonsPro";
  font-weight: medium;
  fonts-style: medium;
  font-size: 10px;
`;

const CollegeText = styled.Text`
  font-family: "Reckless";
  font-size: 10px;
  font-style: italic;
`;

const DateText = styled.Text`
  font-family: "TTCommonsPro";
  font-size: 10px;
  width: 180px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const WrapperColumn = styled.View`
  display: flex;
  flex-direction: column;
`;

const HrGray = styled.View`
  width: 363px;
  opacity: 0.2;
  margin: 10px 0;
  border: 0.5px solid #000;
`;

const HrBold = styled.View`
  width: 363px;
  margin-bottom: 10px;
  border: 0.5px solid #000;
`;

interface EducationProps {
  education: EducationModel;
}

const Education: VoidFunctionComponent<EducationProps> = ({
  education: { name, institute, endDate, startDate },
}) => {
  return (
    <Row>
      <WrapperColumn style={{ marginRight: "auto", width: 150 }}>
        <DegreeText>{name}</DegreeText>
        <CollegeText>{institute}</CollegeText>
      </WrapperColumn>
      <DateText>
        {formatTimespan({
          startDate,
          endDate,
          showEndYear: true,
          dateFormat: "MMMM yyyy",
        })}
      </DateText>
    </Row>
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
    <Row style={{ paddingRight: 24 }}>
      <Header style={{ flexGrow: 1, marginTop: 10 }} fixed>
        Education
      </Header>
      <RightView>
        <HrBold fixed />
        {education.map((education, i) => {
          return (
            <Fragment key={i}>
              {i >= 1 && <HrGray fixed />}
              <Education education={education} />
            </Fragment>
          );
        })}
      </RightView>
    </Row>
  );
};
