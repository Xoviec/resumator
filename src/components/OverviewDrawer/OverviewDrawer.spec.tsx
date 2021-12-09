import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { render, screen, fireEvent } from "@testing-library/react";
import { FunctionComponent } from "react";
import { mocked } from "jest-mock";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { OverviewContent } from "./OverviewContent";
import { OverviewDrawer } from "./OverviewDrawer";

jest.mock("./OverviewContent");
jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/AppStateContext/AppStateContext");
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("OverviewDrawer", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useMediaQuery).mockReturnValue(true);

    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: true },
    } as any);

    mocked(useAppState).mockReturnValue({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    });

    mocked(OverviewContent).mockReturnValue(
      <div data-testid="overview-content-component" />
    );
  });

  it("should always render content", () => {
    render(
      <ThemeProviderWrapper>
        <OverviewDrawer>Page content</OverviewDrawer>
      </ThemeProviderWrapper>
    );

    expect(screen.getByText(/Page content/)).toBeInTheDocument();
  });

  it("should not render drawer when user is not manager", () => {
    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: false },
    } as any);

    render(
      <ThemeProviderWrapper>
        <OverviewDrawer>Page content</OverviewDrawer>
      </ThemeProviderWrapper>
    );

    expect(
      screen.queryByTestId("overview-content-component")
    ).not.toBeInTheDocument();
  });

  it("should toggle drawer based on isDrawerOpen when screen is smaller than lg", () => {
    mocked(useAppState).mockReturnValue({
      isDrawerOpen: false,
      setIsDrawerOpen: jest.fn(),
    } as any);

    mocked(useMediaQuery).mockReturnValue(false);

    const { rerender } = render(
      <ThemeProviderWrapper>
        <OverviewDrawer>Page content</OverviewDrawer>
      </ThemeProviderWrapper>
    );

    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

    mocked(useAppState).mockReturnValue({
      isDrawerOpen: true,
      setIsDrawerOpen: jest.fn(),
    } as any);

    rerender(
      <ThemeProviderWrapper>
        <OverviewDrawer>Page content</OverviewDrawer>
      </ThemeProviderWrapper>
    );

    expect(screen.queryByRole("presentation")).toBeInTheDocument();
  });

  it("should close drawer when clicked outside", () => {
    const setIsDrawerOpen = jest.fn();

    mocked(useAppState).mockReturnValue({
      isDrawerOpen: true,
      setIsDrawerOpen,
    } as any);

    mocked(useMediaQuery).mockReturnValue(false);

    render(
      <ThemeProviderWrapper>
        <OverviewDrawer>
          <div data-testid="outside-element" />
          Page content
        </OverviewDrawer>
      </ThemeProviderWrapper>
    );

    const backdropElement = screen.getByRole("presentation")?.firstChild;
    if (!backdropElement) {
      throw new Error("Backdrop element not found");
    }

    fireEvent.click(backdropElement);
    expect(setIsDrawerOpen).toHaveBeenCalledWith(false);
  });

  it("should render drawer when user is manager", () => {
    mocked(useFirebaseApp).mockReturnValue({
      userRecord: { isManager: true },
    } as any);

    render(
      <ThemeProviderWrapper>
        <OverviewDrawer>Page content</OverviewDrawer>
      </ThemeProviderWrapper>
    );

    expect(screen.queryByTestId("overview-content-component")).toBeInTheDocument();
    expect(screen.queryByTestId("overview-content-component")).toBeVisible();
  });
});
