import { act, fireEvent, render, screen } from "@testing-library/react";
import { Motivation } from "./Motivation";

describe("Motivation", () => {
  const defaultProps = {
    introText: "This is a motivation text",
    onSubmit: jest.fn(),
  };

  test("expect text content of motivation to be displayed", () => {
    render(
      <Motivation
        introText={defaultProps.introText}
        onSubmit={defaultProps.onSubmit}
      />
    );
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Motivation"
    );
    expect(screen.getByText(defaultProps.introText)).toBeInTheDocument();
  });

  test("expect AddIcon to be displayed when no introText is specified", () => {
    render(<Motivation introText="" onSubmit={defaultProps.onSubmit} />);

    expect(screen.getByTestId("AddIcon")).toBeVisible();
  });

  test("expect motivation dialog to be displayed on click AddIcon", () => {
    render(<Motivation introText="" onSubmit={defaultProps.onSubmit} />);

    fireEvent.click(screen.getByTestId("AddIcon"));
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Edit motivation"
    );
  });

  test("expect EditIcon to be displayed when a introText is specified", () => {
    render(
      <Motivation
        introText={defaultProps.introText}
        onSubmit={defaultProps.onSubmit}
      />
    );

    expect(screen.getByTestId("EditIcon")).toBeVisible();
  });

  test("expect motivation dialog to be displayed on click EditIcon", () => {
    render(
      <Motivation
        introText={defaultProps.introText}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Edit motivation"
    );
  });

  test("expect onSubmit to be called on save motivation", async () => {
    render(
      <Motivation
        introText={defaultProps.introText}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test("expect motivation dialog to be closed on click cancel", () => {
    render(
      <Motivation
        introText={defaultProps.introText}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    fireEvent.click(screen.getByText(/cancel/i));

    const dialogTitle = screen.queryByRole("heading", { level: 6 });
    expect(dialogTitle).not.toBeInTheDocument();
  });
});
