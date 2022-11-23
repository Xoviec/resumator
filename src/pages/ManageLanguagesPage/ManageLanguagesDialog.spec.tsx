import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ManageLanguagesDialog } from "./ManageLanguagesDialog";

describe("ManageLanguagesDialog", () => {
  it("It renders correctly", () => {
    const initialRender = render(
      <BrowserRouter>
        <ManageLanguagesDialog
          onSubmit={() => new Promise((resolve) => resolve())}
          open={true}
          setIsDialogOpen={() => {}}
        />
      </BrowserRouter>
    );
    expect(initialRender).toMatchSnapshot();
  });
});
