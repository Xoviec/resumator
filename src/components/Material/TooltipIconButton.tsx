import React, { FunctionComponent } from "react";
import { IconButton, IconButtonProps, Tooltip } from "@material-ui/core";

interface TooltipIconButtonProps extends IconButtonProps {
  tooltip: string;
}

export const TooltipIconButton: FunctionComponent<TooltipIconButtonProps> = ({ tooltip, children, ...props }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton aria-label={tooltip} {...props}>
        {children}
      </IconButton>
    </Tooltip>  
  );
};