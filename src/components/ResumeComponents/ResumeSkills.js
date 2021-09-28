import { Box, Flex, Text, Heading } from "rebass";

export const ResumeSkills = ({ skills }) => {
  return (
    <Flex pt={10}>
      <Box width={400} backgroundColor="#181626" p={4} height={500}>
        <Heading color="#19c3c0">Skills</Heading>
        <Text color="#fff" mt={3}>
          LANGUAGES - FRAMEWORKS - LIBRARIES
        </Text>
        <ul style={{ padding: "1em" }}>
          {skills.map((skill) => {
            return (
              <li key={skill} style={{ color: "red" }}>
                <span style={{ color: "white" }}>{skill}</span>
              </li>
            );
          })}
        </ul>
      </Box>
    </Flex>
  );
};
