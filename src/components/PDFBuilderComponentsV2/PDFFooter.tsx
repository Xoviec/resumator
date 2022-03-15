import { Text, View } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";

interface PDFFooterProps {
  fixed?: boolean;
  textColor?: string;
}

const Footer = styled(View)`
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
`;

const FooterText = styled(Text)`
  font-family: "TTCommonsPro";
  font-size: 9px;
  color: #000;
  text-align: center;
`;

export const PDFFooter: VoidFunctionComponent<PDFFooterProps> = ({
  fixed = false,
  textColor = "#000",
}) => {
  return (
    <Footer fixed={fixed}>
      <FooterText style={{ color: textColor }}>
        Together, we see infinite opportunities
      </FooterText>
    </Footer>
  );
};
