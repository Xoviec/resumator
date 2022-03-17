import { View } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";

const TextArea = styled.Text`
  font-family: "TTCommonsPro";
  color: #fff;
  font-size: 15px;
`;

interface PDFIntroductionProps {
  introduction?: string;
}

export const PDFIntroduction: VoidFunctionComponent<PDFIntroductionProps> = ({
  introduction,
}) => {
  if (!introduction || !introduction.length) {
    return null;
  }

  return (
    <View>
      <TextArea>{introduction}</TextArea>
    </View>
  );
};
