import { FunctionComponent } from "react";
import { Box, Button, Typography, Modal as MuiModal } from "@mui/material";

interface ModalProps {
  isModalOpen: boolean;
  isFilledData: boolean;
  onClose?: () => void;
  onSave: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export const Modal: FunctionComponent<ModalProps> = ({
  isModalOpen,
  isFilledData,
  onClose,
  onSave,
}) => {
  return (
    <MuiModal
      open={isModalOpen && isFilledData}
      onClose={() => null}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Your changes will be lost
        </Typography>
        <Box paddingTop={5} display="flex" justifyContent="flex-end">
          <Button
            style={{
              marginRight: 10,
            }}
            variant="outlined"
            color="error"
            onClick={onClose}
          >
            Close
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save and Close
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};
