import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SectionHeader, SectionHeaderProps } from "./SectionHeader";

test("it should render a title", () => {
  const props = {
    title: "About Donald",
  } as SectionHeaderProps;

  render(<SectionHeader {...props} />);
  expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
    "About Donald"
  );
});

test("it should render a button", () => {
  const props = {
    action: "edit",
  } as SectionHeaderProps;

  render(<SectionHeader {...props} />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("open modal", () => {
  const props = {
    title: "About Donald",
    action: "edit",
    actionTooltip: "",
    actionOnClick: jest.fn(),
  } as SectionHeaderProps;
  render(<SectionHeader {...props} />);
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  userEvent.click(button);
  expect(props.actionOnClick).toHaveBeenCalledTimes(1);
});
