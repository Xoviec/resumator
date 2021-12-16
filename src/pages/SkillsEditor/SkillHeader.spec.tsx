import { render, screen } from "@testing-library/react";
import { SkillHeader, SkillHeaderProps } from "./SkillHeader";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Skill Header", () => {
  const history = createMemoryHistory();

  it("should always render content without error", () => {
    const props = {
      saveEditedSkills: jest.fn(),
      editCount: 0,
      newSkill: "",
      handleNewSkill: jest.fn(),
      saveNewSkill: jest.fn(),
      hasError: false,
    } as SkillHeaderProps;

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillHeader {...props} />
        </ThemeProviderWrapper>
      </Router>
    );

    // expect(screen.getByText(/Page content/)).toBeInTheDocument();
  });

  it("should always render content with error", () => {
    const props = {
      saveEditedSkills: jest.fn(),
      editCount: 0,
      newSkill: "",
      handleNewSkill: jest.fn(),
      saveNewSkill: jest.fn(),
      hasError: true,
    } as SkillHeaderProps;

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillHeader {...props} />
        </ThemeProviderWrapper>
      </Router>
    );

    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});
