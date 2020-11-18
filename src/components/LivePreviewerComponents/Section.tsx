import React, { FunctionComponent } from "react";
import { Card, CardContent } from "@material-ui/core";
import { SectionHeader, SectionHeaderProps } from "./SectionHeader";

interface SectionProps extends SectionHeaderProps {

}

export const Section: FunctionComponent<SectionProps> = ({ children, ...props }) => {
  return (
    <Card>
      <SectionHeader {...props} />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}