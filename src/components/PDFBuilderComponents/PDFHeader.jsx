import React from "react";
import styled from "@react-pdf/styled-components";
import { Font, View } from "@react-pdf/renderer";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import image from "../../assets/images/avatarSeven.png";

Font.register({ family: "Stratum", src: Stratum1 });

const Root = styled.View`
  background-color: #e0e0e0;
  height: 120px;
  padding: 20px 0 0 20px;
  font-family: "Helvetica";
  margin-bottom: 10px;
`;

const Heading = styled.Text`
  font-size: 24px;
`;
const HeadingName = styled.Text`
  font-family: "Stratum";
  font-size: 24px;
  font-weight: 800;
`;

const SubHeading = styled.Text`
  font-size: 12px;
  color: #ff450d;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderBlockTop = styled.View`
  display: flex;
  flex-direction: row;
`;

const Avatar = styled.Image`
  margin-right: 20px;
`;

const HeaderBlockBottom = styled.View`
  margin-bottom: 10px;
`;

export function PDFHeader({ name, city }) {
  return (
    <Root>
      <Flex>
        <View>
          <HeaderBlockTop>
            <Heading>Hi, I am </Heading>
            <HeadingName>{name}</HeadingName>
          </HeaderBlockTop>
          <HeaderBlockBottom>
            <Heading>Frontend expert</Heading>
          </HeaderBlockBottom>
          <SubHeading>{city.toUpperCase()} REGION - NL - OCTOBER 1982</SubHeading>
        </View>
        <Avatar src={image} />
      </Flex>
    </Root>
  );
}
