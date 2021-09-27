import { Box, Text, Heading, Flex } from "rebass";

export const ResumeExperience = ({ experience }) => {
  const ProjectBox = ({
    project: { id, role, company, stackAndTechniques, description },
  }) => {
    return (
      <Box key={id} mb={50}>
        <Box mb={20}>
          <Heading fontSize={6}>{role}</Heading>
          <Text fontSize={4}>{company.toUpperCase()}</Text>
        </Box>
        <Text>{description}</Text>
        <Flex mt={4} backgroundColor={"grey"}>
          <Text mr={2}>Techniques: </Text>
          {stackAndTechniques.map((skill) => {
            return (
              <Text key={skill} mr={2}>
                {skill}
              </Text>
            );
          })}
        </Flex>
      </Box>
    );
  };
  return (
    <Box ml={5} mt={"2.5rem"}>
      <Text fontSize={5} color="#ff450d" mb={2}>
        EXPERIENCE
      </Text>
      {experience.map((project) => {
        return <ProjectBox key={project.id} project={project} />;
      })}
    </Box>
  );
};
