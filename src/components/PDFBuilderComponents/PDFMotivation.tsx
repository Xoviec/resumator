import styled from "@react-pdf/styled-components";
import { PDFExperinceSection } from "./PDFExperinceSection";
import { VoidFunctionComponent } from "react";

const Root = styled.View``;

const TextArea = styled.Text`
  max-width: 386px;
`;

interface PDFMotivationProps {
  motivation?: string;
}

export const PDFMotivation: VoidFunctionComponent<PDFMotivationProps> = ({
  motivation,
}) => {
  if (!motivation || !motivation.length) {
    return null;
  }

  return (
    <Root wrap>
      <PDFExperinceSection title="Motivation">
        <TextArea>{motivation}</TextArea>
      </PDFExperinceSection>
    </Root>
  );
};
