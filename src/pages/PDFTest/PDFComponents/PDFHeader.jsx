import React from "react";
import styled from "@react-pdf/styled-components";
import { Document, PDFViewer, Font } from "@react-pdf/renderer";
import font from "../../../assets/fonts/Stratum1-Bold.ttf";

Font.register({
  family: "FamilyName",
  format: "truetype",
  src: font,
});
Font.register({ family: "Stratum", src: font });
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

const HeaderBlockTop = styled.View`
  display: flex;
  flex-direction: row;
`;

const HeaderBlockBottom = styled.View`
  margin-bottom: 10px;
`;

export function PDFHeader({ name, city }) {
  return (
    <Root>
      <HeaderBlockTop>
        <Heading>Hi, I am </Heading>
        <HeadingName>{name}</HeadingName>
      </HeaderBlockTop>
      <HeaderBlockBottom>
        <Heading>Frontend expert</Heading>
      </HeaderBlockBottom>
      <SubHeading>{city.toUpperCase()} REGION - NL - OCTOBER 1982</SubHeading>
    </Root>
  );
}
