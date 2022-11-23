import { render } from "@testing-library/react";
import { capitalize } from "../../utils";
import { DEFAULT_PAGE_TITLE } from "../constants";
import { Page } from "./Page";

describe("Page", () => {
  it("renders the child component correctly", () => {
    const { getByTestId } = render(
      <Page>
        <div data-testid="child" />
      </Page>
    );

    const child = getByTestId("child");
    expect(child).toBeInTheDocument();
  });

  it("updates the title correctly", () => {
    const mockTitle = "test";
    const expectedTitle = capitalize(`${mockTitle} - ${DEFAULT_PAGE_TITLE}`);

    render(
      <Page title={mockTitle}>
        <div />
      </Page>
    );

    expect(document.title).toEqual(expectedTitle);
  });
});
