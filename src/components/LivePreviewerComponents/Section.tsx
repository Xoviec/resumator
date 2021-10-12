import { FunctionComponent } from "react";
import { Box, Card } from "@mui/material";
import { SectionHeader, SectionHeaderProps } from "./SectionHeader";

type SectionProps = SectionHeaderProps;

export const Section: FunctionComponent<SectionProps> = ({ children, ...props }) => {
  return (
    <Card elevation={3} style={{ padding: "9px" }}>
      <SectionHeader {...props} />
      <Box padding={2} paddingTop={1}>
        {children}
      </Box>
    </Card>
  );
};
