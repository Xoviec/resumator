import { useCallback, VoidFunctionComponent } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";

// configs
import { colors } from "../../config/theme";

// components
import { PDFTemplate } from "../PDFTemplate/PDFTemplate";
import { ResumeModel } from "./ResumeModel";

interface PDFPreviewModalProps {
  showPDFModal: boolean;
  setShowPDFModal: (s: boolean) => void;
  resume: ResumeModel;
}

const useStyles = makeStyles((theme) => ({
  button: {
    "&.MuiButtonBase-root": {
      backgroundColor: colors.darkGray,
      marginBottom: "10px",
    },
    "&.MuiButtonBase-root:hover": {
      backgroundColor: colors.darkGray,
    },
  },
}));

export const PDFPreviewModal: VoidFunctionComponent<PDFPreviewModalProps> = ({
  showPDFModal,
  setShowPDFModal,
  resume,
}) => {
  const classes = useStyles();

  const handleClosePDFModal = useCallback(() => {
    setShowPDFModal(false);
  }, []);

  if (showPDFModal && resume) {
    return (
      <Modal
        open={showPDFModal}
        onClose={handleClosePDFModal}
        aria-labelledby="PDF Preview"
        aria-describedby="PDF Preview"
      >
        <ModalContent>
          <IconButton
            onClick={handleClosePDFModal}
            className={classes.button}
            color="primary"
            aria-label="delete"
            size="large"
          >
            <Close fontSize="inherit" />
          </IconButton>
          <PDFViewer width="100%" height="100%">
            <PDFTemplate resume={resume} />
          </PDFViewer>
        </ModalContent>
      </Modal>
    );
  }
  return null;
};

const ModalContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
  height: 100%;

  &:focus {
    outline: none;
  }
`;
