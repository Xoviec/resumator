import { FunctionComponent, ReactElement } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { TooltipIconButton } from "../Material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { colors } from "../../config/theme";

export interface SectionHeaderProps {
  title: string;
  action?: "add" | "edit";
  actionTooltip?: string;
  actionOnClick?: () => void;
  tooltipTitle?: string;
  tooltipIcon?: ReactElement;
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  title,
  action,
  actionTooltip,
  actionOnClick,
  tooltipTitle = "",
  tooltipIcon,
}) => {
  return (
    <>
      {/* Only show a header if a title and/or action are defined. */}
      {(title || action) && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={1}
          paddingRight={1}
          paddingLeft={2}
        >
          {/* Only show a title if we actually have a title. */}
          <Box display="flex" alignItems="center">
            {title && <Typography variant="h5">{title}</Typography>}
            {!!tooltipTitle && (
              <Tooltip title={tooltipTitle}>
                <IconButton>{tooltipIcon}</IconButton>
              </Tooltip>
            )}
          </Box>
          {/* Only show an action button if we actually have an action. */}
          {action && (
            <TooltipIconButton
              color="inherit"
              tooltip={actionTooltip || ""}
              onClick={actionOnClick}
            >
              {action === "add" && (
                <AddIcon fontSize="small" htmlColor={colors.midBlue} />
              )}
              {action === "edit" && (
                <EditIcon fontSize="small" htmlColor={colors.midBlue} />
              )}
            </TooltipIconButton>
          )}
        </Box>
      )}
    </>
  );
};
