import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { SkillHeader, SkillHeaderProps } from "./SkillHeader";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const props = {
  saveEditedSkills: jest.fn(),
  editCount: 0,
  newSkill: "",
  isBtnDisabled: false,
  handleNewSkill: jest.fn(),
  saveNewSkill: jest.fn(),
} as SkillHeaderProps;

describe("Skill Header", () => {
  it("should always render content", () => {
    render(
      <BrowserRouter>
        <ThemeProviderWrapper>
          <SkillHeader {...props} />
        </ThemeProviderWrapper>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: "Skills" })).toHaveTextContent(
      "Skills"
    );
    expect(screen.getByRole("link", { name: "Go to overview" })).toHaveTextContent(
      "Go to overview"
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add skill" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete selected skills (0)" })
    ).toBeInTheDocument();
  });
});
