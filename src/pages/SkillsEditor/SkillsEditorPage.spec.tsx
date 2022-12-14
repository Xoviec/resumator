import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { mocked } from "jest-mock";
import { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import {
  useFirebaseApp,
  FirebaseAppContextType,
} from "../../context/FirebaseContext/FirebaseContext";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import { SkillsEditorPage } from "./SkillsEditorPage";

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
    <BrowserRouter>
      <ThemeProviderWrapper>
        <SkillsEditorPage />
      </ThemeProviderWrapper>
    </BrowserRouter>
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
      <BrowserRouter>
        <ThemeProviderWrapper>
          <SkillsEditorPage />
        </ThemeProviderWrapper>
      </BrowserRouter>
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
