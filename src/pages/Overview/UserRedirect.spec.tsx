import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { UserRedirect, UserRedirectProps } from "./UserRedirect";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/AppStateContext/AppStateContext");

describe("PDFPreview", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useAppState).mockReturnValue({
      isDrawerOpen: false,
      setIsDrawerOpen: jest.fn(),
    });

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {
            userRecord: { isManager: true },
            firestore: jest.fn().mockReturnValue({
              collection: jest.fn(),
              doc: jest.fn(),
            }),
          },
        } as any)
    );
  });

  // it("Should render", async () => {
  //   const props = { userRecord: { isManager: false } } as UserRedirectProps;
  //   const history = createMemoryHistory();
  //   const useCollection = jest.fn();
  //   useCollection.mockReturnValue({
  //     val: null,
  //     isLoading: true,
  //     error: undefined,
  //   });
  //
  //   render(
  //     <Router history={history}>
  //       <ThemeProviderWrapper>
  //         <UserRedirect {...props} />
  //       </ThemeProviderWrapper>
  //     </Router>
  //   );
  // });
  it("Should render has value", async () => {
    const props = { userRecord: { isManager: true } } as UserRedirectProps;
    const history = createMemoryHistory();
    const useCollection = jest.fn();
    useCollection.mockReturnValue({
      val: {
        docs: [{ data: jest.fn(), id: "Cool Id" }],
      },
      isLoading: false,
      error: undefined,
    });

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <UserRedirect {...props} />
        </ThemeProviderWrapper>
      </Router>
    );
  });
});
