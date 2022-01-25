import { render, screen } from "@testing-library/react";
import { SkillsEditorPage } from "./SkillsEditorPage";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import {
  useFirebaseApp,
  FirebaseAppContextType,
} from "../../context/FirebaseContext/FirebaseContext";
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
  const SkillsEditorPageManageToRender = (
    <Router history={history}>
      <ThemeProviderWrapper>
        <SkillsEditorPage />
      </ThemeProviderWrapper>
    </Router>
  );

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

    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: true },
    } as FirebaseAppContextType);
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

  it("Should render page with an error if isManager false", () => {
    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: false },
    } as FirebaseAppContextType);

    render(SkillsEditorPageManageToRender);

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      /You are not authorized to manage skills. Go back to the home page./
    );
  });

  it("Should render page with table if isManager true", async () => {
    render(SkillsEditorPageManageToRender);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
