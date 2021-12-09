import { render } from "@testing-library/react";
import { SkillsEditorPage } from "./SkillsEditorPage";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { AppStateContextProvider } from "../../context/AppStateContext/AppStateContext";
import { Nav } from "../../components/layout/Nav";
const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../components/layout/Nav");

describe("Skill Editor Page", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
        } as any)
    );

    mocked(Nav).mockImplementation(() => <div />);
  });

  it("Should render page", () => {
    render(
      <Router history={history}>
        <AppStateContextProvider>
          <ThemeProviderWrapper>
            <SkillsEditorPage />
          </ThemeProviderWrapper>
        </AppStateContextProvider>
      </Router>
    );
  });
});
