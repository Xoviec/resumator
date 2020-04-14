import React from "react";
import styled from "@react-pdf/styled-components";
import { Document, PDFViewer, Text } from "@react-pdf/renderer";

const Root = styled.View`
  margin-bottom: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #000;
  font-family: "Stratum";
  font-size: 10px;
`;
const SubText = styled.Text`
  color: #000;
  font-family: "Stratum";
  font-size: 10px;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
`;

const TextArea = styled.Text`
  font-size: 6px;
  width: 300px;
  margin-top: 6px;
`;

export function ProjectsExperienceCard(props) {
  return (
    <Root wrap={false}>
      <Header>SENIOR FRONTEND DEVELOPER</Header>
      <Flex>
        <SubText>RaboBank Utrecht</SubText>
        <SubText>March 2016 - December 2018</SubText>
      </Flex>
      <TextArea>
        You probably haven't heard of them glossier biodiesel cronut schlitz. Paleo
        chia photo booth tofu helvetica kombucha, leggings crucifix butcher
        sustainable godard DIY marfa bespoke blue bottle. Pork belly shabby chic
        letterpress yr celiac banh mi, tofu chambray squid 3 wolf moon mustache four
        dollar toast cronut listicle. Franzen You probably haven't heard of them
        glossier biodiesel cronut schlitz. Paleo chia photo booth tofu helvetica
        kombucha, leggings crucifix butcher sustainable godard DIY marfa bespoke blue
        bottle. Pork belly shabby chic letterpress yr celiac banh mi, tofu chambray
        squid 3 wolf moon mustache four dollar toast cronut listicle. Franzen You
        probably haven't heard of them glossier biodiesel cronut schlitz. Paleo chia
        photo booth tofu helvetica kombucha, leggings crucifix butcher sustainable
        godard DIY marfa bespoke blue bottle. Pork belly shabby chic letterpress yr
        celiac banh mi, tofu chambray squid 3 wolf moon mustache four dollar toast
        cronut listicle. Franzen
      </TextArea>
    </Root>
  );
}
