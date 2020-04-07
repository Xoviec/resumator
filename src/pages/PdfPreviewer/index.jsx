import React from "react";
import { Box, Flex } from "rebass";
import data from "./mock.json";
import {
  ResumeHeader,
  ResumeAbout,
  ResumeProjects,
  ResumeSkills,
} from "./ResumeComponents";

const PdfPreviewer = () => {
  const [resume, SetResume] = React.useState();

  React.useEffect(() => {
    SetResume(data);
  }, []);

  const resumeView = () => {
    return resume ? (
      <>
        <ResumeHeader name={resume.firstName} />
        <Flex>
          <ResumeAbout text={resume.about} />
          <ResumeProjects projects={resume.projects} />
        </Flex>
        <ResumeSkills />
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
