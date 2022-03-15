import { Text, View } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { VoidFunctionComponent } from "react";
import { calculateAge } from "../../lib";
import { PersonaliaModel } from "../LivePreviewerComponents/TopSection";

const TextSection = styled(View)`
  margin-bottom: 15px;
`;

const DetailsText = styled(Text)`
  font-size: 10px;
  color: #fff;
  line-height: 1.5;
`;

export const PDFPersonalDetails: VoidFunctionComponent<{
  personalia: PersonaliaModel;
}> = ({ personalia: { dateOfBirth, email, city } }) => {
  const age = dateOfBirth ? calculateAge(dateOfBirth) : "";

  return (
    <View>
      <TextSection>
        <DetailsText>{age} jaar</DetailsText>
      </TextSection>
      <TextSection>
        <DetailsText>{email}</DetailsText>
      </TextSection>
      <TextSection>
        <DetailsText>{city}</DetailsText>
      </TextSection>
    </View>
  );
};
