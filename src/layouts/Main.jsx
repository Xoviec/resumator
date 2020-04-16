import React from "react";
import { ThemeProvider } from "emotion-theming";
import { Box } from "rebass";
import { Nav } from "../components/layout";
import theme from "../config/theme";
import "../assets/css/global.css";

const MainLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Nav />

      <Box as="main" bg="secondary" p={["1rem", "2rem"]} sx={{ minHeight: "100%" }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
