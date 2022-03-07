import { render, screen } from "@testing-library/react";
import { ManageUsersPage } from "./ManageUsersPage";
import { BrowserRouter } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import {
  useFirebaseApp,
  FirebaseAppContextType,
} from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/AppStateContext/AppStateContext");

describe("ManageUsers Page", () => {
  const ManageUsersPageToRender = (
    <BrowserRouter>
      <ThemeProviderWrapper>
        <ManageUsersPage />
      </ThemeProviderWrapper>
    </BrowserRouter>
  );

  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useAppState).mockReturnValue({
      isDrawerOpen: false,
      setIsDrawerOpen: jest.fn(),
    });

    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: true },
    } as FirebaseAppContextType);
  });

  it("Should render page with an error if isManager false", () => {
    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: false },
    } as FirebaseAppContextType);

    render(ManageUsersPageToRender);

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      /You are not authorized to manage users. Go back to the home page./
    );
  });

  it("Should render page with table if isManager true", async () => {
    render(ManageUsersPageToRender);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
