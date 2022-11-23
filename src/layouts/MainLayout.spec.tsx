import { render } from "@testing-library/react";
import { MainLayout } from "./MainLayout";

jest.mock("../components/layout/Nav", () => ({
  Nav: () => <div data-testid="test-nav" />,
}));
jest.mock("../config/theme");

describe("LoginLayout", () => {
  it("renders correctly", () => {
    const { container } = render(<MainLayout />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders Nav", () => {
    const { getByTestId } = render(<MainLayout />);
    expect(getByTestId("test-nav")).toBeInTheDocument();
  });
});
