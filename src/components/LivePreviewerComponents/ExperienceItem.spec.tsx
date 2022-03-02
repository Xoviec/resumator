import { fireEvent, render, screen } from "@testing-library/react";
import { ExperienceItem, ExperienceModel } from "./ExperienceItem";
import { formatTimespan } from "../../lib/date";
import { workExperiences } from "../../mocks/mocks";

describe("EducationItem", () => {
  const defaultProps = {
    type: "Work Experience",
    experienceItem: workExperiences[0] as ExperienceModel,
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  test("expect text content of experience to be displayed", () => {
    const { role, company, startDate, endDate, description, stackAndTechniques } =
      defaultProps.experienceItem;
    render(
      <ExperienceItem
        type={defaultProps.type}
        experienceItem={defaultProps.experienceItem}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(role);
    expect(screen.getByText(company)).toBeInTheDocument();
    // expect(screen.getByText(description)).toBeInTheDocument();
    expect(
      screen.getByText(
        formatTimespan({ startDate, endDate, dateFormat: "MMMM yyyy" })
      )
    ).toBeInTheDocument();
    stackAndTechniques.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test("expect onDelete to be called on click DeleteIcon", () => {
    render(
      <ExperienceItem
        type={defaultProps.type}
        experienceItem={defaultProps.experienceItem}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );

    fireEvent.click(screen.getByTestId("DeleteIcon"));
    fireEvent.click(screen.getByText(/yes/i)); // Confirm delete
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  test("expect onEdit to be called on click EditIcon", () => {
    render(
      <ExperienceItem
        type={defaultProps.type}
        experienceItem={defaultProps.experienceItem}
        onDelete={defaultProps.onDelete}
        onEdit={defaultProps.onEdit}
      />
    );

    fireEvent.click(screen.getByTestId("EditIcon"));
    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });
});
