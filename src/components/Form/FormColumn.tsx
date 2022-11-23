import { Box } from "@mui/material";
import { FunctionComponent } from "react";

export const FormColumn: FunctionComponent = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
      {children}
    </Box>
  );
};
