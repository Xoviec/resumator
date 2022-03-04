import { fireEvent, render, screen } from "@testing-library/react";
import { EducationItem, EducationModel } from "./EducationItem";
import { educations } from "../../mocks/mocks";

describe("EducationItem", () => {
  const defaultProps = {
    education: educations[0] as EducationModel,
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  test("expect name and institute of education to be displayed", () => {
    render(
      <EducationItem
        educationItem={defaultProps.education}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      defaultProps.education.name
    );
    expect(screen.getByText(defaultProps.education.institute)).toBeInTheDocument();
  });

  test("expect onDelete to be called on click DeleteIcon", () => {
    render(
      <EducationItem
        educationItem={defaultProps.education}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );

    fireEvent.click(screen.getByTestId("DeleteIcon"));
    fireEvent.click(screen.getByText(/yes/i)); // Confirm delete
    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  test("expect onEdit to be called on click EditIcon", () => {
    render(
      <EducationItem
        educationItem={defaultProps.education}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    expect(defaultProps.onEdit).toHaveBeenCalled();
  });
});
