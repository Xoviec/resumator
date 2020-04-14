import React from "react";
import { ThemeProvider } from "emotion-theming";
import "../assets/css/global.css";
import { Box } from "rebass";
import theme from "../config/theme";

const MainLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box as="main" bg="secondary" p={["1rem", "2rem"]} sx={{ minHeight: "100%" }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
