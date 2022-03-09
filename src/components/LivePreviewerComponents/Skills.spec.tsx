import { act, fireEvent, render, screen } from "@testing-library/react";
import { Skills, SkillsProps } from "./Skills";

describe("Skills", () => {
  const defaultProps = {
    skills: [
      {
        name: "React",
        isActive: true,
      },
      {
        name: "Angular",
        isActive: true,
      },
    ],
    onSubmit: jest.fn(),
  } as SkillsProps;

  test("expect name of skills to be displayed", () => {
    render(<Skills skills={defaultProps.skills} onSubmit={defaultProps.onSubmit} />);
    defaultProps.skills.forEach((item) => {
      expect(screen.getByText(item.name));
    });
  });

  // TODO move useSkillsContext out of FormSkillsSelectAutocomplete component and pass skillList as props
  xtest("expect edit dialog to be displayed on click AddIcon", async () => {
    render(<Skills skills={defaultProps.skills} onSubmit={defaultProps.onSubmit} />);

    await act(async () => {
      fireEvent.click(screen.getByTestId("EditIcon"));
    });
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Skills");
  });
});
