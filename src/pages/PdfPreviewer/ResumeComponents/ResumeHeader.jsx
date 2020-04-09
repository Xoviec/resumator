import React from "react";
import { Box, Text } from "rebass";

export const ResumeHeader = ({ name, city }) => {
  return (
    <Box width="100%" backgroundColor="#e0e0e0" p={2}>
      <Text fontSize={7}>
        Hi, I am <span style={{ fontWeight: "bold" }}>{name}</span> <br />
        Frontend expert
      </Text>
      <Text fontSize={3} color="#ff450d" mb={20}>
        {/* Date(OCTOBER 1979) will have a Helper function which will be made after API is implemented */}
        {city} Region - NL - OCTOBER 1979
      </Text>
    </Box>
  );
};
