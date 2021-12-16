import { render } from "@testing-library/react";
import { SkillsEditorPage } from "./SkillsEditorPage";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/SkillsContext/SkillsContext");
jest.mock("../../context/AppStateContext/AppStateContext");

describe("Skill Editor Page", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useSkillsContext).mockReturnValue({
      skillList: [],
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

  it("Should render page", () => {
    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorPage />
        </ThemeProviderWrapper>
      </Router>
    );
  });
});
