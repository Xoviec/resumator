// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FunctionComponent, SyntheticEvent, useCallback, useState } from "react";
import { colors } from "../../config/theme";
import { Confirmation } from "../Confirmation/Confirmation";
import { TooltipIconButton } from "../Material";

const PREFIX = "SectionItemHeader";

const classes = {
  actions: `${PREFIX}-actions`,
};

const Actions = styled(Box)(({ theme }) => ({
  opacity: 0,
  transition: "opacity 150ms ease-out",
  pointerEvents: "none",
  alignSelf: "start",
  flexShrink: 0,
}));

const OuterContainer = styled(Box)(({ theme }) => ({
  [`&:hover .${classes.actions}`]: {
    opacity: 1,
    pointerEvents: "all",
  },
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

interface SectionItemHeaderProps {
  title: string;
  type: string;
  onDelete: () => void;
  onEdit: () => void;
}

export const SectionItemHeader: FunctionComponent<SectionItemHeaderProps> = ({
  title,
  type,
  onDelete,
  onEdit,
  children,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleOpenEditModal = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      onEdit();
    },
    [onEdit]
  );

  return (
    <OuterContainer>
      <InnerContainer>
        <Typography variant="h6">{title}</Typography>
        <Actions marginRight={-1} className={classes.actions}>
          {/* Delete item */}
          <TooltipIconButton
            color="inherit"
            tooltip={`Delete ${type}`}
            onClick={() => setDeleteConfirmationOpen(true)}
          >
            <DeleteIcon fontSize="small" style={{ color: colors.midBlue }} />
          </TooltipIconButton>
          {/* Edit item */}
          <TooltipIconButton
            color="inherit"
            tooltip={`Edit ${type}`}
            onClick={handleOpenEditModal}
          >
            <EditIcon
              fontSize="small"
              style={{ color: colors.midBlue }}
              onClick={handleOpenEditModal}
            />
          </TooltipIconButton>
        </Actions>

        <Confirmation
          isOpen={deleteConfirmationOpen}
          denyClick={() => setDeleteConfirmationOpen(false)}
          confirmClick={() => {
            setDeleteConfirmationOpen(false);
            onDelete();
          }}
          title={"Delete item"}
          message={`Are you sure you want to delete this item?
          <br/>
          This action cannot be reversed.`}
        />
      </InnerContainer>
      {children}
    </OuterContainer>
  );
};
