import { render } from "@testing-library/react";
import { FormRow } from ".";

describe("FormRow", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<FormRow>test-content</FormRow>);

    expect(asFragment()).toMatchSnapshot();
  });
});
