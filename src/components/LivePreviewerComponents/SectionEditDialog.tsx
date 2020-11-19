import React, { FunctionComponent } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, Typography } from "@material-ui/core";
import { TooltipIconButton } from "../Material";
// Icons
import CloseIcon from "@material-ui/icons/Close";

interface SectionEditDialogProps extends DialogProps {
  title: string;
  onCancel: () => void;
  onSave: () => void;
}

export const SectionEditDialog: FunctionComponent<SectionEditDialogProps> = ({ title, onCancel, onSave, children, ...props }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="section-edit-dialog-title"
      aria-describedby="section-edit-dialog-content"
      onClose={onCancel}
      {...props}
    >
      {/* Custom title to include a close button, example from material documentation doesn't work. */}
      <Box display="flex" flexDirection="row" justifyContent="space-between" padding={1}>
        <Box paddingX={2} paddingY={1}>
          <Typography id="section-edit-dialog-title" variant="h6">
            {title}
          </Typography>
        </Box>
        <TooltipIconButton
          tooltip="Close"
          onClick={onCancel}
        >
          <CloseIcon />
        </TooltipIconButton>
      </Box>
      {/* Content */}
      <DialogContent id="section-edit-dialog-content">
        {children}
      </DialogContent>
      {/* Actions for cancel and save. */}
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};