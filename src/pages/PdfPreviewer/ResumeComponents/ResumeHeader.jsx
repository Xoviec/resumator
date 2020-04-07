import React from "react";
import { Box, Heading, Text } from "rebass";

export const ResumeHeader = (props) => {
  return (
    <Box width="100%" backgroundColor="#e0e0e0" height={250} p={[2, 0, 0, 4]}>
      <Text fontSize={7}>
        Hi, I am <span variant="spanText">{props.name}</span> <br />
        Frontend expert
      </Text>
      <Text fontSize={3} color="#ff450d">
        Hilversum Region - NL - OCTOBER 1979
      </Text>
    </Box>
  );
};
