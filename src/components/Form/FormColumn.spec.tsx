import { render } from "@testing-library/react";
import { FormColumn } from ".";

describe("FormColumn", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<FormColumn>test-content</FormColumn>);

    expect(asFragment()).toMatchSnapshot();
  });
});
