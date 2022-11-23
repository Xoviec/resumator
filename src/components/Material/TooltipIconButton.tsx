import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FunctionComponent } from "react";

interface TooltipIconButtonProps extends IconButtonProps {
  tooltip: string;
  active?: boolean;
}

export const TooltipIconButton: FunctionComponent<TooltipIconButtonProps> = ({
  tooltip,
  active,
  children,
  ...props
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        aria-label={tooltip}
        color={active ? "secondary" : "default"}
        {...props}
        size="large"
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
