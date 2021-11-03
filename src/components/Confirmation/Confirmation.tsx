import { VoidFunctionComponent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface ConfirmationProps {
  isOpen: boolean;
  onClose?: () => any;
  title?: string;
  message?: string;
  denyText?: string;
  confirmText?: string;
  denyClick: () => any;
  confirmClick: () => any;
}

export const Confirmation: VoidFunctionComponent<ConfirmationProps> = ({
  isOpen,
  onClose = () => null,
  title = "Confirm action",
  message = "This action cannot be reversed.",
  denyClick,
  confirmClick,
  denyText = "No",
  confirmText = "Yes",
  ...props
}) => {
  return (
    <Dialog open={isOpen !== false} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box dangerouslySetInnerHTML={{ __html: message }} />
      </DialogContent>
      <DialogActions>
        <Button aria-label="deny button" onClick={denyClick}>
          {denyText}
        </Button>
        <Button aria-label="confirm button" onClick={confirmClick}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
