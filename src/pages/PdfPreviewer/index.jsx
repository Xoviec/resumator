import React from "react";
import { Box, Flex } from "rebass";
import data from "./mock.json";
import {
  ResumeHeader,
  ResumeAbout,
  ResumeExperience,
  ResumeSkills,
  ResumeEducation,
} from "./ResumeComponents";

const PdfPreviewer = () => {
  const [resume, SetResume] = React.useState();

  // Using an effect hook is now an assumption on how we will fetch data form API
  // Can be refactored later when real API comes in
  React.useEffect(() => {
    SetResume(data);
  }, []);

  const resumeView = () => {
    // TODO map data from api and create new data object

    return resume ? (
      <>
        <ResumeHeader
          name={resume.firstName}
          city={resume.personalia.address.city}
        />
        <Flex>
          <ResumeAbout width={1 / 2} text={resume.introduction} />
          <ResumeExperience width={1 / 2} experience={resume.experience} />
        </Flex>
        <ResumeSkills skills={resume.skills} />
        <ResumeEducation />
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
