import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Confirmation, ConfirmationProps } from "./Confirmation";

describe("Confirmation", () => {
  it("should render the correct default values", async () => {
    const props = {
      isOpen: true,
      denyClick: () => null,
      confirmClick: () => null,
    } as unknown as ConfirmationProps;

    render(<Confirmation {...props} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Confirm action"
    );
    expect(screen.getByRole("button", { name: /deny button/i })).toHaveTextContent(
      "No"
    );
    expect(
      screen.getByRole("button", { name: /confirm button/i })
    ).toHaveTextContent("Yes");
    expect(screen.getByText("This action cannot be reversed.")).toBeInTheDocument();
  });

  it("should render a title", () => {
    const props = {
      isOpen: true,
      title: "Confirmation title",
      denyClick: jest.fn(),
      confirmClick: jest.fn(),
    } as ConfirmationProps;

    render(<Confirmation {...props} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      props.title!
    );
  });

  it("should render a message", () => {
    const props = {
      isOpen: true,
      message: "This is a message",
      denyClick: jest.fn(),
      confirmClick: jest.fn(),
    } as ConfirmationProps;

    render(<Confirmation {...props} />);
    expect(screen.getByText(props.message!)).toBeInTheDocument();
  });

  it("should trigger the button actions on click", async () => {
    const props = {
      isOpen: true,
      onClose: jest.fn(),
      denyClick: jest.fn(),
      confirmClick: jest.fn(),
    } as ConfirmationProps;

    render(<Confirmation {...props} />);

    const denyBtn = screen.getByRole("button", { name: /deny button/i });
    expect(denyBtn).toBeInTheDocument();
    userEvent.click(denyBtn);
    expect(props.denyClick).toHaveBeenCalledTimes(1);

    const confirmBtn = screen.getByRole("button", { name: /confirm button/i });
    expect(confirmBtn).toBeInTheDocument();
    userEvent.click(confirmBtn);
    expect(props.confirmClick).toHaveBeenCalledTimes(1);
  });
});
