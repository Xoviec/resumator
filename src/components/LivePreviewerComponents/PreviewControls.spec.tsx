import { act, fireEvent, render, screen } from "@testing-library/react";
import { downloadResume } from "../../lib/downloadResume";
import { resume } from "../../mocks/mocks";
import { PreviewControls, PreviewControlsProps } from "./PreviewControls";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: [],
  }),
}));

jest.mock("../../context/FirebaseContext/FirebaseContext", () => ({
  useFirebaseApp: () => ({
    firebase: {},
  }),
}));

jest.mock("../../lib/downloadResume", () => ({
  downloadResume: jest.fn(),
}));

describe("PreviewControls", () => {
  const defaultProps = {
    resume,
    setShowPDFModal: jest.fn(),
    setThemeStyle: jest.fn(),
    onToggleIsArchived: jest.fn(),
  } as PreviewControlsProps;

  test("expect downloadResume to be called on selecting 'Download as..' option", async () => {
    render(
      <PreviewControls
        resume={defaultProps.resume}
        setShowPDFModal={defaultProps.setShowPDFModal}
        setThemeStyle={defaultProps.setThemeStyle}
        onToggleIsArchived={defaultProps.onToggleIsArchived}
      />
    );

    await act(async () => {
      await fireEvent.click(screen.getByText(/download as../i));
      await fireEvent.click(screen.getByText(/pdf_io/i));
    });
    expect(downloadResume).toHaveBeenCalledTimes(1);
  });

  test("expect setShowPDFModal and setThemeStyle to be called on selecting 'Preview' option", async () => {
    render(
      <PreviewControls
        resume={defaultProps.resume}
        setShowPDFModal={defaultProps.setShowPDFModal}
        setThemeStyle={defaultProps.setThemeStyle}
        onToggleIsArchived={defaultProps.onToggleIsArchived}
      />
    );

    await act(async () => {
      await fireEvent.click(screen.getByText(/preview/i));
      await fireEvent.click(screen.getByText("iO"));
    });
    expect(defaultProps.setShowPDFModal).toHaveBeenCalledTimes(1);
    expect(defaultProps.setThemeStyle).toHaveBeenCalledTimes(1);
  });

  test("expect toggleIsArchive to be called on clicking 'Archive' button", async () => {
    render(
      <PreviewControls
        resume={defaultProps.resume}
        setShowPDFModal={defaultProps.setShowPDFModal}
        setThemeStyle={defaultProps.setThemeStyle}
        onToggleIsArchived={defaultProps.onToggleIsArchived}
      />
    );

    await act(async () => {
      await fireEvent.click(screen.getByText(/archive/i));
    });
    expect(defaultProps.onToggleIsArchived).toHaveBeenCalledTimes(1);
  });
});
