import { act, fireEvent, render, screen } from "@testing-library/react";
import { PDFPreviewModal, PDFPreviewModalProps } from "./PDFPreviewModal";
import { resume } from "../../mocks/mocks";

jest.mock("@react-pdf/renderer", () => ({
  PDFViewer: ({ children }: { children: any }) => <div>{children}</div>,
}));
jest.mock("../PDFTemplate/PDFTemplate", () => ({
  PDFTemplate: ({ children }: { children: any }) => <div>{children}</div>,
}));
jest.mock("../PDFTemplate/PDFTemplateFM", () => ({
  PDFTemplateFM: ({ children }: { children: any }) => <div>{children}</div>,
}));

describe("PDFPreviewModal", () => {
  const defaultProps = {
    showPDFModal: true,
    setShowPDFModal: jest.fn(),
    resume,
    themeStyle: "FrontMen",
  } as PDFPreviewModalProps;

  test("expect pdf modal to be displayed when showPdfModal is true", () => {
    render(
      <PDFPreviewModal
        showPDFModal={defaultProps.showPDFModal}
        setShowPDFModal={defaultProps.setShowPDFModal}
        resume={defaultProps.resume}
        themeStyle={defaultProps.themeStyle}
      />
    );
    expect(screen.getByTestId("pdf-preview-modal")).toBeVisible();
  });

  test("expect setShowPDFModal to be called on click CloseIcon", async () => {
    render(
      <PDFPreviewModal
        showPDFModal={defaultProps.showPDFModal}
        setShowPDFModal={defaultProps.setShowPDFModal}
        resume={defaultProps.resume}
        themeStyle={defaultProps.themeStyle}
      />
    );

    await act(async () => {
      await fireEvent.click(screen.getByTestId("CloseIcon"));
    });
    expect(defaultProps.setShowPDFModal).toHaveBeenCalledTimes(1);
  });
});
