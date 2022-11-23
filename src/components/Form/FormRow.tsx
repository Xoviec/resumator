import { Box } from "@mui/material";
import { FunctionComponent } from "react";

export const FormRow: FunctionComponent = ({ children }) => {
  return (
    <Box display="flex" flexDirection="row" gap="8px">
      {children}
    </Box>
  );
};
