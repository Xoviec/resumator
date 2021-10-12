import { FunctionComponent } from "react";
import { Box } from "@mui/material";

export const FormRow: FunctionComponent = ({ children }) => {
  return (
    <Box display="flex" flexDirection="row" gap="8px">
      {children}
    </Box>
  );
};
