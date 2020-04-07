import React from "react";
import { Box, Heading, Text } from "rebass";
import data from "./mock.json";

const PdfPreviewer = () => {
  const [resume, SetResume] = React.useState();

  React.useEffect(() => {
    SetResume(data);
  }, []);

  const resumeView = () => {
    return resume ? (
      <>
        <Box width="100%" backgroundColor="#e0e0e0" height="400px">
          <Text fontSize={7}>
            Hi, I am {resume.firstName} <br />
            Frontend expert
          </Text>
        </Box>
      </>
    ) : (
      <div>...loading</div>
    );
  };
  return (
    <Box width="100%" p="2rem" color="white" bg="white" textAlign="left">
      <Box color="secondary" mb="3">
        {resumeView()}
      </Box>
    </Box>
  );
};

export default PdfPreviewer;
