import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDocument } from "../../pages/PdfPreviewer";
import styled from "@emotion/styled";
import Modal from "@material-ui/core/Modal";

const PDFPreviewModal = ({ showPDFModal, setShowPDFModal, data }) => {
  if (showPDFModal && data) {
    return (
      <Modal
        open={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        aria-labelledby="PDF Preview"
        aria-describedby="PDF Preview"
      >
        <ModalContent>
          <PDFViewer width={"100%"} height={"100%"}>
            <PDFDocument resume={data} />
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

export default PDFPreviewModal;
