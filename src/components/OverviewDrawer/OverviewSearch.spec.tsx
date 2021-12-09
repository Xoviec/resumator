import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { FunctionComponent } from "react";
import { OverviewSearch } from "./OverviewSearch";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("OverviewSearch", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    render(
      <ThemeProviderWrapper>
        <OverviewSearch onSearchChange={jest.fn()} />
      </ThemeProviderWrapper>
    );

    expect(document.body).toMatchSnapshot();

    expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
  });

  it("should debounce and call onSearchChange only once", async () => {
    const onSearchChange = jest.fn();

    render(
      <ThemeProviderWrapper>
        <OverviewSearch onSearchChange={onSearchChange} />
      </ThemeProviderWrapper>
    );

    userEvent.type(screen.getByPlaceholderText(/Search/), "test-content");

    await waitFor(() => expect(onSearchChange).toHaveBeenCalledTimes(1));
    expect(onSearchChange).toHaveBeenCalledWith("test-content");
  });
});
