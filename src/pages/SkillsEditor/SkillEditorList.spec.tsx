import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
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

  it("Should render page", async () => {
    const handleChangeSkill = jest.fn();

    const { getByTestId, getByText } = render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <SkillsEditorList />
        </ThemeProviderWrapper>
      </Router>
    );

    // await waitFor(() => {
    //   const input = getByTestId("content-input") as HTMLInputElement;
    //   fireEvent.input(input);
    //   expect(input).toBeInTheDocument();
    // });
  });
});
