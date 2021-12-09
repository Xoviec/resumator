import { render } from "@testing-library/react";
import { SpacedButton } from "./SpacedButton";

describe("SpacedButton", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<SpacedButton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
