import { render } from "@testing-library/react";

import { FrontmenLogoIcon } from "./FrontmenLogoIcon";

describe("FrontmenLogoIcon", () => {
  it("renders correctly", () => {
    const { container } = render(<FrontmenLogoIcon />);
    expect(container).toMatchSnapshot();
  });
});
