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
  background-color: #e0e0e0;
  height: 145px;
  padding: 0 0 0 20px;
  font-family: "Titillium Web";
  font-weight: 300;
  margin-bottom: 10px;
`;

const Heading = styled(Text)`
  font-size: 36px;
`;

const HeadingName = styled(Text)`
  font-family: "Stratum";
  font-size: 36px;
  font-weight: 800;
  position: relative;
  top: 9px;
`;

const PersonalInfoText = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const SubHeading = styled(Text)`
  font-size: 10px;
  color: #ff450d;
`;

const HeaderBlockTop = styled(View)`
  display: flex;
  flex-direction: row;
  line-height: 1.2;
`;

const Avatar = styled(Image)`
  position: absolute;
  right: 40px;
  bottom: 0;
  width: 65px;
`;

export const PDFHeader: VoidFunctionComponent<{ personalia: PersonaliaModel }> = ({
  personalia: { avatar, firstName, city, dateOfBirth },
}) => {
  const month = dateOfBirth ? formatDate(dateOfBirth, "MMMM")?.toUpperCase() : "";
  const year = dateOfBirth ? formatDate(dateOfBirth, "yyyy") : "";
  city = city ? city : "";

  return (
    <Root>
      <PersonalInfoText>
        <HeaderBlockTop>
          <Heading>Hi, I am </Heading>
          <HeadingName>{firstName}</HeadingName>
        </HeaderBlockTop>

        <View>
          <Heading>Frontend expert</Heading>
        </View>

        <SubHeading>
          {city.toUpperCase()} REGION - NL - {month} {year}
        </SubHeading>
      </PersonalInfoText>

      <Avatar src={(avatars.find((x) => x.name === avatar) || avatars[0]).img} />
    </Root>
  );
};
