import { render, screen } from "@testing-library/react";
import { resume } from "../../mocks/mocks";
import {
  LivePreviewerTemplate,
  LivePreviewerTemplateProps,
} from "./LivePreviewerTemplate";

describe("LivePreviewerTemplate", () => {
  const defaultProps = {
    data: resume,
  } as LivePreviewerTemplateProps;

  // TODO remove useFirebaseApp() call and handle fetching and updating resumes outside of LivePreviewerTemplate component
  xtest("expect text content of experience to be displayed", () => {
    const {
      personalia: { firstName, lastName },
    } = defaultProps.data;

    render(<LivePreviewerTemplate data={defaultProps.data} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      `${firstName} ${lastName}`
    );
  });
});
