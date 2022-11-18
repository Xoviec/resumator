import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("It renders correctly", () => {
    const intialRender = render(
      <BrowserRouter>
        <PageHeader title="test" />
      </BrowserRouter>
    );
    expect(intialRender).toMatchSnapshot();
  });
});
