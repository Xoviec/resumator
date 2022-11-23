import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { VoidFunctionComponent } from "react";

export interface ConfirmationProps {
  isOpen: boolean;
  onClose?: () => React.MouseEventHandler<HTMLButtonElement> | undefined | null;
  title?: string;
  message?: string;
  denyText?: string;
  confirmText?: string;
  denyClick: () => React.MouseEventHandler<HTMLButtonElement> | undefined | void;
  confirmClick: () => React.MouseEventHandler<HTMLButtonElement> | undefined | void;
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
