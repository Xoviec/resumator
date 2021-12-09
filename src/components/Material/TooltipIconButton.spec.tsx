import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { TooltipIconButton } from "./TooltipIconButton";

describe("TooltipIconButton", () => {
  it("should render correctly", () => {
    render(
      <TooltipIconButton
        color="inherit"
        tooltip={"Tooltip text"}
        onClick={jest.fn()}
      >
        Content
      </TooltipIconButton>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Content");
  });

  it("should toggle tooltip on hover", async () => {
    render(
      <TooltipIconButton
        color="inherit"
        tooltip={"Tooltip text"}
        onClick={jest.fn()}
        active={true}
      >
        Content
      </TooltipIconButton>
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    userEvent.hover(screen.getByText("Content"));

    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeInTheDocument());
    expect(screen.queryByRole("tooltip")).toHaveTextContent(/Tooltip text/);

    userEvent.unhover(screen.getByText("Content"));

    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    );
  });

  it("should call onClick when clicked", async () => {
    const onChange = jest.fn();

    render(
      <TooltipIconButton
        color="inherit"
        tooltip={"Tooltip text"}
        onClick={onChange}
        active={true}
      >
        Content
      </TooltipIconButton>
    );

    userEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalled();
  });
});
