import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import React, { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import SkillsEditorList from "./SkillsEditorList";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/SkillsContext/SkillsContext");
jest.mock("../../context/AppStateContext/AppStateContext");

describe("Skill List", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useSkillsContext).mockReturnValue({
      skillList: ["JS"],
      updateSkillList: jest.fn(),
    });

    mocked(useAppState).mockReturnValue({
      isDrawerOpen: false,
      setIsDrawerOpen: jest.fn(),
    });

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
        } as any)
    );
  });

  it("Should render page and change new skill name", async () => {
    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorList />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Skill name") as HTMLInputElement;
      expect(input).toBeInTheDocument();
      fireEvent.input(input, { target: { value: "new" } });
      expect(input.value).toBe("new");

      const form = screen.getByTestId("form");
      fireEvent.submit(form);
    });
  });
  it("Should render page and skill list include skill name", async () => {
    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorList />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Skill name") as HTMLInputElement;
      expect(input).toBeInTheDocument();
      fireEvent.input(input, { target: { value: "JS" } });
      expect(input.value).toBe("JS");

      const form = screen.getByTestId("form");
      fireEvent.submit(form);
    });
  });
  it("Should render Confirmation and click on deny", async () => {
    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorList />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const deleteBtn = screen.getByLabelText("delete");
      expect(deleteBtn).toBeInTheDocument();
      fireEvent.click(deleteBtn);
      const denyBtn = screen.getByLabelText("deny button") as HTMLButtonElement;
      expect(denyBtn).toBeInTheDocument();
      fireEvent.click(denyBtn);
    });
  });
  it("Should render Confirmation and click on confirm", async () => {
    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorList />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const deleteBtn = screen.getByLabelText("delete");
      expect(deleteBtn).toBeInTheDocument();
      fireEvent.click(deleteBtn);
      const confirmBtn = screen.getByLabelText(
        "confirm button"
      ) as HTMLButtonElement;
      expect(confirmBtn).toBeInTheDocument();
      fireEvent.click(confirmBtn);
    });
  });
  it("Should render pag and handle change skill", async () => {
    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorList />
        </ThemeProviderWrapper>
      </Router>
    );

    await waitFor(() => {
      const input = screen.getByTestId("content-input");
      fireEvent.input(input, { target: { value: "something" } });
    });
  });
});
