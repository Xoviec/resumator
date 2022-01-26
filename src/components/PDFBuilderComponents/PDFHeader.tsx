import styled from "@react-pdf/styled-components";
import { View, Text, Image, Font } from "@react-pdf/renderer";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import { avatars } from "../../assets/images/avatars/avatars";
import { formatDate } from "../../lib/date";
import { VoidFunctionComponent } from "react";
import { PersonaliaModel } from "../LivePreviewerComponents/TopSection";

Font.register({ family: "Stratum", src: Stratum1 });

const Root = styled(View)`
  width: 100%;
  background-color: #873170
  height: 145px;
  padding: 0 0 0 20px;
  font-family: "TT Commons Pro";
  margin-bottom: 10px;
  color: white;
`;

const Heading = styled(Text)`
  font-size: 36px;
`;

const PersonalInfoText = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const SubHeading = styled(Text)`
  font-size: 10px;
`;

const HeaderBlockTop = styled(View)`
  display: flex;
  flex-direction: row;
  line-height: 1.2;
`;

const PersonalInfoBox = styled(Text)`
  font-family: "Reckless";
  font-weight: 300;
  font-size: 10px;
  font-style: italic;
  position: absolute;
  width: 221px;
  height: 212px;
  background: #f5b3cc;
`;

export const PDFHeader: VoidFunctionComponent<{ personalia: PersonaliaModel }> = ({
  personalia: { firstName, city, dateOfBirth, lastName, email },
}) => {
  const month = dateOfBirth ? formatDate(dateOfBirth, "MMMM")?.toUpperCase() : "";
  const year = dateOfBirth ? formatDate(dateOfBirth, "yyyy") : "";
  city = city ? city : "";

  return (
    <Root>
      <PersonalInfoText>
        <HeaderBlockTop>
          <Heading>
            {firstName} {lastName}
          </Heading>
        </HeaderBlockTop>

        <SubHeading>Senior frontend developer</SubHeading>
      </PersonalInfoText>

      <PersonalInfoBox>
        {email}
        {city.toUpperCase()} REGION - NL - {month} {year}
        {year}
      </PersonalInfoBox>
    </Root>
  );
};
