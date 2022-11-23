import { act, fireEvent, render, screen } from "@testing-library/react";
import { personalia } from "../../mocks/mocks";
import { SectionEditDialog, SectionEditDialogProps } from "./SectionEditDialog";

describe("SectionEditDialog", () => {
  const data = personalia;
  const defaultProps = {
    title: "Title",
    data,
    onCancel: jest.fn(),
    onSave: jest.fn(),
    open: true,
  } as SectionEditDialogProps<typeof data>;

  test("expect dialog with title to be displayed when 'open' is true", () => {
    render(
      <SectionEditDialog
        title={defaultProps.title}
        data={defaultProps.data}
        onCancel={defaultProps.onCancel}
        onSave={defaultProps.onSave}
        open={defaultProps.open}
      />
    );

    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      defaultProps.title
    );
  });

  test("expect onSave to be called on click save button", async () => {
    render(
      <SectionEditDialog
        title={defaultProps.title}
        data={defaultProps.data}
        onCancel={defaultProps.onCancel}
        onSave={defaultProps.onSave}
        open={defaultProps.open}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
  });

  test("expect onCancel to be called on click cancel", () => {
    render(
      <SectionEditDialog
        title={defaultProps.title}
        data={defaultProps.data}
        onCancel={defaultProps.onCancel}
        onSave={defaultProps.onSave}
        open={defaultProps.open}
      />
    );

    fireEvent.click(screen.getByText(/cancel/i));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
