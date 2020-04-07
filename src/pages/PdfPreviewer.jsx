import React from "react";
import { Box, Heading } from "rebass";

const PdfPreviewer = () => {
  return (
    <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
      <Heading fontSize={7} color="secondary" mb="3">
        PDF OUTPUT
      </Heading>
    </Box>
  );
};

export default PdfPreviewer;
