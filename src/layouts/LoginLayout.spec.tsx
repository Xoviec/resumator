import { render } from "@testing-library/react";
import { LoginLayout } from "./LoginLayout";

describe("LoginLayout", () => {
  it("renders correctly", () => {
    const { container } = render(<LoginLayout />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with children", () => {
    const { container } = render(
      <LoginLayout>
        <div>test-content</div>
      </LoginLayout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
