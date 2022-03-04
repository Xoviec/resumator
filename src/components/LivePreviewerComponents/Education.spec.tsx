import { act, fireEvent, render, screen } from "@testing-library/react";
import { Education } from "./Education";
import { EducationModel } from "./EducationItem";
import { educations } from "../../mocks/mocks";

describe("Education", () => {
  const defaultProps = {
    education: educations as EducationModel[],
    onSubmit: jest.fn(),
  };

  test("expect name and institute of education to be displayed", () => {
    render(
      <Education
        education={defaultProps.education}
        onSubmit={defaultProps.onSubmit}
      />
    );
    defaultProps.education.forEach((item, index) => {
      expect(screen.getAllByRole("heading", { level: 6 })[index]).toHaveTextContent(
        item.name
      );
      expect(screen.getByText(item.institute)).toBeInTheDocument();
    });
  });

  test("expect edit dialog to be displayed on click AddIcon", () => {
    render(
      <Education
        education={defaultProps.education}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getByTestId("AddIcon"));
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Add education"
    );
  });

  test("expect edit dialog to be displayed on click EditIcon", () => {
    render(
      <Education
        education={defaultProps.education}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Edit education"
    );
  });

  test("expect onSubmit to be called on save education", async () => {
    render(
      <Education
        education={defaultProps.education}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test("expect onSubmit to be called on delete education", () => {
    render(
      <Education
        education={defaultProps.education}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getAllByTestId("DeleteIcon")[0]); // Click first delete icon
    fireEvent.click(screen.getByText(/yes/i)); // Confirm delete
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test("expect edit dialog to be closed on click cancel", async () => {
    render(
      <Education
        education={defaultProps.education}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    await act(async () => {
      await fireEvent.click(screen.getByText(/cancel/i));
    });
    const dialogTitle = screen.queryByText("Edit education");
    expect(dialogTitle).not.toBeInTheDocument();
  });
});
