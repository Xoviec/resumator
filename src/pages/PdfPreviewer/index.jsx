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
import { PDFSideProjects } from "../../components/PDFBuilderComponents/PDFSideProjects";

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

export const PDFDocument = ({ resume }) => {
  return (
    <Document>
      <Wrapper size="A4">
        <PDFHeader
          avatar={resume.avatar}
          name={resume.personalia.firstName}
          city={resume.personalia.city}
        />
        <Flex>
          <View>
            <PDFIntroduction introduction={resume.introduction} />
            <PDFSkills skills={resume.skills} />
            <PDFEducation education={resume.education} />
            <PDFSideProjects
              type="openSource"
              sideProjects={resume.openSourceWork}
            />
            <PDFSideProjects sideProjects={resume.publications} />
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
  const uuid = props.match.params.id;
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${uuid}`)
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
