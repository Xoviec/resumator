import { FunctionComponent } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { TooltipIconButton } from "../Material";
import { HelpSharp } from "@mui/icons-material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { colors } from "../../config/theme";

export interface SectionHeaderProps {
  title: string;
  action?: "add" | "edit";
  actionTooltip?: string;
  actionOnClick?: () => void;
  isHelpTooltip?: boolean;
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  title,
  action,
  actionTooltip,
  actionOnClick,
  isHelpTooltip = false,
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
          height={52}
          paddingTop={1}
          paddingRight={1}
          paddingLeft={2}
        >
          {/* Only show a title if we actually have a title. */}
          <Box display="flex" alignItems="center">
            {title && <Typography variant="h5">{title}</Typography>}
            {isHelpTooltip && (
              <Tooltip title="Click a skill to show/hide them in the PDF resume">
                <IconButton>
                  <HelpSharp />
                </IconButton>
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
