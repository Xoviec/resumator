import React, { FunctionComponent, ReactNode } from "react";
import { Box, Typography } from "@material-ui/core";
import { TooltipIconButton } from "../Material";
// Icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

export interface SectionHeaderProps {
  title: string;
  action: "add" | "edit";
  actionTooltip: string;
  actionOnClick: () => void;
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({ title, action, actionTooltip, actionOnClick }) => {
  return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingTop={1}
        paddingRight={1}
        paddingLeft={2}
      >
        <Typography variant="h5">{title}</Typography>
        <TooltipIconButton
          tooltip={actionTooltip}
          onClick={actionOnClick}
        >
          {action === "add" && <AddIcon fontSize="small" />}
          {action === "edit" && <EditIcon fontSize="small" />}
        </TooltipIconButton>
      </Box>
  )
}