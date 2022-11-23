import { Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface DetailWithIconProps {
  icon: ReactNode;
}

export const DetailWithIcon: FunctionComponent<DetailWithIconProps> = ({
  icon,
  children,
}) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap="8px">
      {icon}
      {children ? children : "---"}
    </Box>
  );
};
