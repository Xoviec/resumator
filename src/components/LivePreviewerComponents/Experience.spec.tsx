import { act, fireEvent, render, screen } from "@testing-library/react";
import { formatTimespan } from "../../lib/date";
import { workExperiences } from "../../mocks/mocks";
import { Experience } from "./Experience";
import { ExperienceModel } from "./ExperienceItem";

describe("Experience", () => {
  const defaultProps = {
    type: "Work Experience",
    experience: [workExperiences[0]] as ExperienceModel[],
    skills: [],
    onSubmit: jest.fn(),
  };

  test("expect text content of experience to be displayed", () => {
    const { role, company, startDate, endDate, stackAndTechniques } =
      defaultProps.experience[0];

    render(
      <Experience
        type={defaultProps.type}
        experience={defaultProps.experience}
        skills={defaultProps.skills}
        onSubmit={defaultProps.onSubmit}
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

  // TODO move useSkillsContext out of FormSkillsSelectAutocomplete component and pass skillList as props
  xtest("expect edit dialog to be displayed on click AddIcon", async () => {
    render(
      <Experience
        type={defaultProps.type}
        experience={defaultProps.experience}
        skills={defaultProps.skills}
        onSubmit={defaultProps.onSubmit}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("AddIcon"));
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      `Add ${defaultProps.type}`
    );
  });

  // TODO move useSkillsContext out of FormSkillsSelectAutocomplete component and pass skillList as props
  xtest("expect onEdit to be called on click EditIcon", async () => {
    render(
      <Experience
        type={defaultProps.type}
        experience={defaultProps.experience}
        skills={defaultProps.skills}
        onSubmit={defaultProps.onSubmit}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      `Edit ${defaultProps.type}`
    );
  });

  // TODO move useSkillsContext out of FormSkillsSelectAutocomplete component and pass skillList as props
  xtest("expect edit dialog to be closed on click cancel", () => {
    render(
      <Experience
        type={defaultProps.type}
        experience={defaultProps.experience}
        skills={defaultProps.skills}
        onSubmit={defaultProps.onSubmit}
      />
    );

    fireEvent.click(screen.getAllByTestId("EditIcon")[0]); // Click first edit icon
    fireEvent.click(screen.getByText(/cancel/i));

    const dialogTitle = screen.queryByText(`Edit ${defaultProps.type}`);
    expect(dialogTitle).not.toBeInTheDocument();
  });
});
