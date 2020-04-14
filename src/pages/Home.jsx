import React from "react";
import { Button, Box, Heading, Text } from "rebass";

const Home = () => (
  <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
    <Heading fontSize={7} color="secondary" mb="3">
      Frontmen Resumator
    </Heading>
    <Text fontSize={4} color="text" mb="4">
      Welcome to the Frontmen Resumator, a tool to generate Resumes
    </Text>
    <Button variant="primary" p="1rem">
      Login with Frontmen account
    </Button>
  </Box>
);

export default Home;
