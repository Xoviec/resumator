import React, { FunctionComponent, ReactNode } from "react";
import { Box } from "@material-ui/core";

interface TopSectionPersonaliaProps {
  icon: ReactNode;
}

export const TopSectionPersonalia: FunctionComponent<TopSectionPersonaliaProps> = ({ icon, children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridGap={8}
    >
      {icon}
      {children ? children : "---"}
    </Box>
  );
};
