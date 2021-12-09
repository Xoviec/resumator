import { fireEvent, render } from "@testing-library/react";
import { DropdownButton } from "./DropdownButton";

describe("DropdownButton", () => {
  it("should render correctly", () => {
    render(
      <DropdownButton
        variant="contained"
        actions={["Action1", "Action2"]}
        startIcon={<div />}
        onClick={jest.fn()}
        color="primary"
      />
    );

    // @mui/Menu renders a portal
    expect(document.body).toMatchSnapshot();
  });

  it("should open the menu when clicked", () => {
    const { getByText } = render(
      <DropdownButton
        variant="contained"
        actions={["Action1", "Action2"]}
        startIcon={<div />}
        onClick={jest.fn()}
        color="primary"
      >
        Main Button
      </DropdownButton>
    );

    fireEvent.click(getByText("Main Button"));
    expect(getByText("Action1")).toBeVisible();
    expect(getByText("Action2")).toBeVisible();
  });

  it("should call onClick when an action is clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <DropdownButton
        variant="contained"
        actions={["Action1", "Action2"]}
        startIcon={<div />}
        onClick={onClick}
        color="primary"
      >
        Main Button
      </DropdownButton>
    );

    fireEvent.click(getByText("Action1"));
    expect(onClick).toHaveBeenCalledWith("Action1");
  });
});
