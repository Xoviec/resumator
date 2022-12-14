// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";
import { colors } from "../../config/theme";
import { TooltipIconButton } from "../Material";

export interface SectionHeaderProps {
  title: string;
  action?: "add" | "edit";
  actionTooltip?: string;
  actionOnClick?: () => void;
  tooltipTitle?: string;
  tooltipIcon?: ReactElement;
  disabled?: boolean;
  onTooltipIconClick?: () => void;
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  title,
  action,
  actionTooltip,
  actionOnClick,
  tooltipTitle = "",
  tooltipIcon,
  disabled,
  onTooltipIconClick,
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
              <Tooltip onClick={onTooltipIconClick} title={tooltipTitle}>
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
              disabled={disabled}
            >
              {action === "add" && (
                <AddIcon
                  fontSize="small"
                  htmlColor={!disabled ? colors.black : colors.lightGrey}
                />
              )}
              {action === "edit" && (
                <EditIcon fontSize="small" htmlColor={colors.black} />
              )}
            </TooltipIconButton>
          )}
        </Box>
      )}
    </>
  );
};
