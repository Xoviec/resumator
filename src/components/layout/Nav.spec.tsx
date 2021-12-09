import { render } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { FunctionComponent } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { mocked } from "jest-mock";
import { Nav } from "./Nav";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/AppStateContext/AppStateContext");

beforeEach(jest.clearAllMocks);

describe("Nav", () => {
  it("opens the drawer when clicked on open drawer button", () => {
    let isDrawerOpen = false;
    const setIsDrawerOpenMock = jest.fn((fn) => {
      isDrawerOpen = fn(isDrawerOpen);
    });

    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen,
      setIsDrawerOpen: setIsDrawerOpenMock,
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
        } as any)
    );

    const { asFragment, getByLabelText } = render(
      <Router history={createMemoryHistory()}>
        <Nav />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(getByLabelText("open drawer"));

    expect(isDrawerOpen).toEqual(true);
  });

  it("closes the drawer when clicked on close drawer button", async () => {
    let isDrawerOpen = true;
    const setIsDrawerOpenMock = jest.fn((fn) => {
      isDrawerOpen = fn(isDrawerOpen);
    });

    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen,
      setIsDrawerOpen: setIsDrawerOpenMock,
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
        } as any)
    );

    const { asFragment, getByLabelText } = render(
      <Router history={createMemoryHistory()}>
        <Nav />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(getByLabelText("close drawer"));

    expect(isDrawerOpen).toEqual(false);
  });

  it("signs out and navigates to home when clicked to sign out button", async () => {
    const signOutMock = jest.fn();

    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {
            auth: () => ({
              signOut: signOutMock,
            }),
          },
        } as any)
    );

    const memoryHistory = createMemoryHistory();

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <Nav />
      </Router>
    );

    userEvent.click(getByLabelText(/sign out/i));

    expect(signOutMock).toHaveBeenCalled();
    expect(memoryHistory.location.pathname).toEqual("/");
  });

  it("shows adminMenuItems when the user is manager", async () => {
    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
          userRecord: { isManager: true },
        } as any)
    );

    const { getByText } = render(
      <ThemeProviderWrapper>
        <Router history={createMemoryHistory()}>
          <Nav />
        </Router>
      </ThemeProviderWrapper>
    );

    expect(getByText(/add resume/i)).toBeInTheDocument();
    expect(getByText(/manage skills/i)).toBeInTheDocument();
  });

  it("hides adminMenuItems when the user is not manager", () => {
    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
          userRecord: { isManager: false },
        } as any)
    );

    const { queryByText } = render(
      <ThemeProviderWrapper>
        <Router history={createMemoryHistory()}>
          <Nav />
        </Router>
      </ThemeProviderWrapper>
    );

    expect(queryByText(/add resume/i)).not.toBeInTheDocument();
    expect(queryByText(/manage skills/i)).not.toBeInTheDocument();
  });

  it("shows the user avatar when present", () => {
    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
          authUser: { displayName: "John Doe", photoURL: "https://example.com" },
        } as any)
    );

    const { getByAltText } = render(
      <ThemeProviderWrapper>
        <Router history={createMemoryHistory()}>
          <Nav />
        </Router>
      </ThemeProviderWrapper>
    );

    expect(getByAltText("John Doe")).toBeInTheDocument();
    expect(getByAltText("John Doe").getAttribute("src")).toEqual(
      "https://example.com"
    );
  });

  it("shows default avatar when user photo not present", () => {
    mocked(useAppState).mockImplementation(() => ({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    }));

    mocked(useFirebaseApp).mockImplementation(
      () =>
        ({
          firebase: {},
        } as any)
    );

    const { getByLabelText } = render(
      <ThemeProviderWrapper>
        <Router history={createMemoryHistory()}>
          <Nav />
        </Router>
      </ThemeProviderWrapper>
    );

    expect(getByLabelText("user avatar")).toBeInTheDocument();
  });
});