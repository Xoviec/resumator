import styled from "@react-pdf/styled-components";
import React from "react";
import { ProficiencyLevel, ResumeLanguage } from "../../types/language";

type Props = {
  resumeLanguages: ResumeLanguage[];
};
const RightView = styled.View``;

const Header = styled.Text`
  font-size: 10px;
  font-family: "TTCommonsPro";
  font-weight: bold;
  font-style: bold;
  color: #fff;
`;

const Language = styled.Text`
  font-family: "TTCommonsPro";
  font-size: 10px;
  width: 180px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 24px;
  margin-top: 17px;
`;

const WrapperColumn = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HrGray = styled.View`
  display: flex;
  flex: 1;
  opacity: 0.2;
  margin: 10px 0;
  border: 0.5px solid #000;
`;

const HrBold = styled.View`
  width: 363px;
  margin-bottom: 10px;
  border: 0.5px solid #000;
`;

const HrWhite = styled.View`
  width: 87px;
  margin-bottom: 10px;
  border: 0.5px solid #fff;
`;

const LanguageContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.View`
  display: flex;
`;

const Proficiency = styled.Text`
  font-family: "Reckless";
  font-size: 10px;
  font-style: italic;
  color: #000;
`;

const sortLanguages = (languages: ResumeLanguage[]) =>
  languages.sort(
    (a, b) =>
      Object.values(ProficiencyLevel).indexOf(
        b.proficiency?.name as ProficiencyLevel
      ) -
      Object.values(ProficiencyLevel).indexOf(
        a.proficiency?.name as ProficiencyLevel
      )
  );

const PDFLanguages: React.FC<Props> = ({ resumeLanguages }) => {
  if (!resumeLanguages || !resumeLanguages.length) {
    return null;
  }

  return (
    <Row>
      <WrapperColumn>
        <HrWhite />
        <Header>Languages</Header>
      </WrapperColumn>

      <RightView>
        <HrBold fixed />
        {sortLanguages(resumeLanguages).map(({ proficiency, language }, index) => {
          const isLastItem = index + 1 === resumeLanguages.length;
          if (!language || !proficiency) return null;
          return (
            <Wrapper key={language.id}>
              <LanguageContainer>
                <Language>{language.name}</Language>
                <Proficiency>{proficiency.name}</Proficiency>
              </LanguageContainer>
              {!isLastItem && <HrGray />}
            </Wrapper>
          );
        })}
      </RightView>
    </Row>
  );
};

export default PDFLanguages;
