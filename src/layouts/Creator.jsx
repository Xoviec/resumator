import React from "react";
import { ThemeProvider } from "emotion-theming";
import "../assets/css/global.css";
import { Box } from "rebass";
import theme from "../config/theme";

const CreatorLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box bg="secondary" p={[2, 5]} sx={{ minHeight: "100%" }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default CreatorLayout;
