import React, { useContext } from "react";
import { Document, PDFViewer, Font, View } from "@react-pdf/renderer";
import {
  PDFHeader,
  PDFIntroduction,
  PDFSkills,
  PDFEducation,
  PDFProjects,
  PDFWorkExperience,
} from "../../components/PDFBuilderComponents";
import styled from "@react-pdf/styled-components";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import Tillium from "../../assets/fonts/Titillium_Web/TitilliumWeb-Regular.ttf";
import { useDocument } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";

Font.register({ family: "Stratum", src: Stratum1 });
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

const PdfPreviewer = (props) => {
  const { firebase } = useContext(FirebaseAppContext);

  // uuid is the users uuid from the firestore database
  // it will be used to fetch the correct resume data
  const uuid = props.match.params.id;
  console.log(uuid);
  const [value, loading, error] = useDocument(
    // Remove hardcoded uuid when google auth is merged
    firebase.firestore().doc("resumes/5dngjR6z8R0vofQTSuNb")
  );

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value && (
        <PDFViewer width={"100%"} height={"100%"}>
          <PDFDocument resume={value.data()} />
        </PDFViewer>
      )}
    </>
  );
};

export default PdfPreviewer;
