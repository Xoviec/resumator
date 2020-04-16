import React from "react";
import { ThemeProvider } from "emotion-theming";
import "../assets/css/global.css";
import { Flex, Box } from "rebass";
import theme from "../config/theme";
import frontmenLogo from "../assets/svg/frontmen-logo.svg";

const LoginLayout = ({ children }) => (
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
      {children}
    </Flex>
  </ThemeProvider>
);

export default LoginLayout;
