import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import { PDFViewer } from "@react-pdf/renderer";
import { useCallback, VoidFunctionComponent } from "react";
// configs
import { colors } from "../../config/theme";
// components
import { PDFTemplate } from "../PDFTemplate/PDFTemplate";
import { ThemeStyle } from "./PreviewControls";
import { ResumeModel } from "./ResumeModel";

export interface PDFPreviewModalProps {
  showPDFModal: boolean;
  setShowPDFModal: (s: boolean) => void;
  resume: ResumeModel;
  themeStyle: ThemeStyle;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    backgroundColor: colors.secondary,
    marginBottom: "10px",
  },
  "&.MuiButtonBase-root:hover": {
    backgroundColor: colors.secondary,
  },
}));

const ModalContent = styled("div")(({ theme }) => ({
  maxWidth: 1440,
  margin: "0 auto",
  padding: 32,
  height: "100%",

  "&:focus": {
    outline: "none",
  },
}));

export const PDFPreviewModal: VoidFunctionComponent<PDFPreviewModalProps> = ({
  showPDFModal,
  setShowPDFModal,
  resume,
  themeStyle,
}) => {
  const handleClosePDFModal = useCallback(() => {
    setShowPDFModal(false);
  }, [setShowPDFModal]);

  const renderPDF = useCallback(() => {
    // TODO themeStyle left in here to support different resume styles in future
    return (
      <PDFViewer width="100%" height="100%">
        <PDFTemplate resume={resume} />
      </PDFViewer>
    );
  }, [resume]);

  if (showPDFModal && resume) {
    return (
      <Modal
        open={showPDFModal}
        onClose={handleClosePDFModal}
        aria-labelledby="PDF Preview"
        aria-describedby="PDF Preview"
        data-testid="pdf-preview-modal"
      >
        <ModalContent>
          <StyledIconButton
            onClick={handleClosePDFModal}
            color="primary"
            aria-label="delete"
            size="large"
          >
            <Close fontSize="inherit" />
          </StyledIconButton>
          {renderPDF()}
        </ModalContent>
      </Modal>
    );
  }
  return null;
};
