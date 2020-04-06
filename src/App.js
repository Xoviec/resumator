import React from "react"
import { ThemeProvider } from "emotion-theming"
import "./assets/css/global.css"
import theme from "./config/theme"
import { Button, Flex, Box, Heading, Text } from "rebass"
import frontmenLogo from "./assets/svg/frontmen-logo.svg"

const App = () => (
  <ThemeProvider theme={theme}>
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="secondary"
    >
      <Box p="2rem">
        <img src={frontmenLogo} alt="logo" />
      </Box>
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
    </Flex>
  </ThemeProvider>
)

export default App
