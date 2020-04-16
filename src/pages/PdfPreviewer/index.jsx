import React from "react";
import { Document, PDFViewer, Font, View } from "@react-pdf/renderer";
import {
  PDFHeader,
  PDFIntroduction,
  PDFSkills,
  PDFEducation,
  PDFProjects,
  PDFWorkExperience,
} from "../../components/PDFBuilderComponents";
import data from "../../mock/mock.json";
import styled from "@react-pdf/styled-components";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import Tillium from "../../assets/fonts/Titillium_Web/TitilliumWeb-Regular.ttf";

Font.register([
  {
    family: "FamilyName",
    format: "truetype",
    src: Stratum1,
  },
]);

Font.register({
  family: "Titillium Web",
  format: "truetype",
  src: Tillium,
});

const Wrapper = styled.Page`
  padding: 20px;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
`;

const PDFDocument = ({ resume }) => {
  return (
    <Document>
      <Wrapper size="A4">
        <PDFHeader
          name={resume.personalia.firstName}
          city={resume.personalia.city}
        />
        <Flex>
          <View>
            <PDFIntroduction introduction={resume.introduction} />
            <PDFSkills skills={resume.skills} />
            <PDFEducation education={resume.education} />
            <View style={{ width: "200px", height: "100vh" }}></View>
          </View>
          <View>
            <PDFProjects projects={resume.projects} />
            <PDFWorkExperience experience={resume.experience} />
          </View>
        </Flex>
      </Wrapper>
    </Document>
  );
};

const PdfPreviewer = () => {
  const [resume, SetResume] = React.useState();

  React.useEffect(() => {
    SetResume(data);
  }, []);

  return resume ? (
    <>
      <PDFViewer width={"100%"} height={"100%"}>
        <PDFDocument resume={resume} />
      </PDFViewer>
    </>
  ) : (
    <div>...loading</div>
  );
};

export default PdfPreviewer;
