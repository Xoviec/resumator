import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { PDFExperinceSection } from "./PDFExperinceSection";

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
  if (!motivation || !motivation.length || motivation.length === 1) {
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
