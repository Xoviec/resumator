import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDocument } from "../../pages/PdfPreviewer";
import styled from "@emotion/styled";
import Modal from "react-modal";

const PDFPreviewModal = ({ showPDFModal, setShowPDFModal, data }) => {
  if (showPDFModal && data) {
    return (
      <StyledModal
        isOpen={showPDFModal}
        onRequestClose={() => setShowPDFModal(false)}
        contentLabel="PDF preview"
        ariaHideApp={false}
      >
        <ModalContent>
          <PDFViewer width={"100%"} height={"100%"}>
            <PDFDocument resume={data} />
          </PDFViewer>
        </ModalContent>
      </StyledModal>
    );
  }
  return null;
};

const StyledModal = styled(Modal)`
  margin: 32px;
  padding: 32px;
  height: 100%;
`;

const ModalContent = styled.div`
  height: 100%;
`;

export default PDFPreviewModal;
