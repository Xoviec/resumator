import React from "react";
import { Box, Heading } from "rebass";
import data from "./mock.json";

const PdfPreviewer = () => {
  const [resume, SetResume] = React.useState();

  React.useEffect(() => {
    SetResume(data);
  }, []);

  const resumeView = () => {
    if (resume) {
      for (let [key, value] of Object.entries(resume)) {
        console.log(`${key}: ${value}`);
      }
    }
  };
  return (
    <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
      <Heading fontSize={7} color="secondary" mb="3">
        {resumeView()}
      </Heading>
    </Box>
  );
};

export default PdfPreviewer;
