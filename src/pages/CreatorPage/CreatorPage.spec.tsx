import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import { CreatorPage } from "./CreatorPage";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/SkillsContext/SkillsContext");
jest.mock("../../context/AppStateContext/AppStateContext");

describe("Skill List", () => {
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
          firebase: {
            firestore: jest.fn().mockReturnValue({
              collection: jest.fn(),
            }),
          },
        } as any)
    );
  });

  it("Should render page and click on cancel", async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <CreatorPage />
        </ThemeProviderWrapper>
      </Router>
    );

    expect(screen.queryByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));

    expect(history.push).toHaveBeenCalledWith("/");
  });
});
