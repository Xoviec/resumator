import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import data from "../PdfPreviewer/mock.json";

// Create styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  section: {
    flexGrow: 1,
    backgroundColor: "#19c3c0",
    color: "#fff",
  },
  span: {
    fontWeight: "bold",
  },
  test: {
    display: "inline-block",
  },
  header: {
    padding: "10px",
  },
});

const Heading = styled.Text`
  margin: 10px;
  font-size: 48px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
`;

// Create Document Component
const MyDocument = ({ resume }) => {
  console.log(resume);
  return (
    <Document>
      <Page size="A4" style={styles.header}>
        <View style={styles.header}>
          <Header>
            <Heading>Hi, I am</Heading>
            <Heading>{resume.personalia.firstName}</Heading>
          </Header>
          <Text>Frontend expert</Text>
        </View>
        <View style={styles.section}>
          <Text>{resume.introduction}</Text>
        </View>
      </Page>
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
