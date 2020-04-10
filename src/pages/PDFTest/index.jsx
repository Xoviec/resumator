import React from "react";
import { Document, PDFViewer, Font } from "@react-pdf/renderer";
import {
  PDFHeader,
  PDFIntroduction,
  PDFSkills,
  PDFEducation,
} from "./PDFComponents";
import data from "../PdfPreviewer/mock.json";
import styled from "@react-pdf/styled-components";
import font from "../../assets/fonts/Stratum1-Bold.ttf";

Font.register({
  family: "FamilyName",
  format: "truetype",
  src: font,
});

const Wrapper = styled.Page`
  padding: 20px;
`;

const MyDocument = ({ resume }) => {
  console.log(resume);
  return (
    <Document>
      <Wrapper size="A4">
        <PDFHeader
          name={resume.personalia.firstName}
          city={resume.personalia.city}
        />
        <PDFIntroduction introduction={resume.introduction} />
        <PDFSkills introduction={resume.introduction} />
        <PDFEducation introduction={resume.introduction} />
      </Wrapper>
    </Document>
  );
};

const PDFTest = () => {
  const [resume, SetResume] = React.useState();

  React.useEffect(() => {
    SetResume(data);
  }, []);

  return resume ? (
    <>
      <PDFViewer width={"100%"} height={"100%"}>
        <MyDocument resume={resume} />
      </PDFViewer>
    </>
  ) : (
    <div>...loading</div>
  );
};

export default PDFTest;
