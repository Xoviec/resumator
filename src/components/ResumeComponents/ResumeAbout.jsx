import { Box, Flex, Text } from "rebass";

export const ResumeAbout = ({ text }) => {
  return (
    <Flex pt={10}>
      <Box width={400} backgroundColor="#19c3c0" p={4}>
        <Text fontSize={2} color="#fff">
          {text}
        </Text>
      </Box>
    </Flex>
  );
};
