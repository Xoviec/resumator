import styled from "@react-pdf/styled-components";
import { View, Text, Image } from "@react-pdf/renderer";
import { VoidFunctionComponent } from "react";
import { PersonaliaModel } from "../LivePreviewerComponents/TopSection";
import LogoWhite from "../../assets/images/iO-logo-white.png";

const Root = styled(View)`
  width: 100%;
  font-weight: 300;
  margin-bottom: 100px;
  border-bottom: 1px solid #000;
`;

const HeaderBlockTop = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const circleSize = 180;
const QuarterCircleImageWrapper = styled(View)`
  width: ${circleSize}px;
  height: ${circleSize}px;
  overflow: hidden;
`;

const QuarterCircleImage = styled(View)`
  top: -${circleSize}px;
  left: -${circleSize}px;
  width: ${circleSize * 2}px;
  height: ${circleSize * 2}px;
  background: #d9def4;
  border-radius: ${circleSize * 2}px;
`;

export const Logo = styled(Image)`
  width: 80px;
  height: 80px;
  margin-top: -20px;
  margin-right: -10px;
`;

const HeadingContainer = styled(View)`
  display: flex;
  margin-top: 30px;
  width: 140px;
`;

const HeadingText = styled(Text)`
  font-family: "TTCommonsPro";
  font-size: 12px;
  font-weight: bold,
  color: #fff;
  line-height: 1.1;
`;

export const PDFHeader: VoidFunctionComponent<{ personalia: PersonaliaModel }> = ({
  personalia: { firstName, lastName, role },
}) => {
  return (
    <Root>
      <HeaderBlockTop>
        <QuarterCircleImageWrapper>
          <QuarterCircleImage />
        </QuarterCircleImageWrapper>
        <Logo src={LogoWhite} />
      </HeaderBlockTop>

      <HeadingContainer>
        <HeadingText>
          {firstName} {lastName}
        </HeadingText>
        <HeadingText>{role}</HeadingText>
      </HeadingContainer>
    </Root>
  );
};
