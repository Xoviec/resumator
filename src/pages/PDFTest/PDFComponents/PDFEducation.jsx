import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const TextArea = styled.Text`
  color: #fff;
  font-size: 8px;
`;

export function PDFEducation({ introduction }) {
  return (
    <Root>
      <TextArea>{introduction}</TextArea>
    </Root>
  );
}
