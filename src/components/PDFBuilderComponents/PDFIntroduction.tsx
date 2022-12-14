import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";

const Root = styled.View`
  background-color: #19c3c0;
  line-height: 1.5;
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const TextArea = styled.Text`
  color: #fff;
  font-size: 9px;
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
    <Root>
      <TextArea>{introduction}</TextArea>
    </Root>
  );
};
