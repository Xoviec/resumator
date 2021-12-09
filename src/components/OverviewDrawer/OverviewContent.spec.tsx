import { TabPanel } from "@mui/lab";
import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";
import { OverviewContent } from "./OverviewContent";
import { OverviewList } from "./OverviewList";
import { OverviewSearch } from "./OverviewSearch";

jest.mock("./OverviewList");
jest.mock("./OverviewSearch");

describe("OverviewContent", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mocked(OverviewSearch).mockReturnValue(null);
    mocked(OverviewList).mockReturnValue(null);
  });

  it("should render tabs correctly", () => {
    render(<OverviewContent />);

    expect(
      screen.getByRole("tablist", {
        name: "User overview tabs",
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: "Active Users" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Archived Users" })).toBeInTheDocument();
  });

  it("should react to search field change", () => {
    mocked(OverviewSearch).mockImplementation(({ onSearchChange }) => (
      <input
        data-testid="search-field"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    ));
    mocked(OverviewList).mockImplementation(({ searchTerms }) => (
      <div>{searchTerms}</div>
    ));

    render(<OverviewContent />);

    fireEvent.change(screen.getByTestId("search-field"), {
      target: { value: "test-search" },
    });
    expect(screen.getByText("test-search")).toBeInTheDocument();
  });

  it("should switch to selected tab", () => {
    mocked(OverviewList).mockImplementation(() => (
      <div>
        <TabPanel value="active-users-tab">
          <div>Active Users Content</div>
        </TabPanel>
        <TabPanel value="archived-users-tab">
          <div>Archived Users Content</div>
        </TabPanel>
      </div>
    ));

    render(<OverviewContent />);

    expect(screen.getByRole("tab", { name: "Active Users" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "Archived Users" })).toHaveAttribute(
      "aria-selected",
      "false"
    );

    expect(screen.queryByText("Active Users Content")).toBeVisible();
    expect(screen.queryByText("Archived Users Content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Archived Users" }));

    expect(screen.getByRole("tab", { name: "Active Users" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
    expect(screen.getByRole("tab", { name: "Archived Users" })).toHaveAttribute(
      "aria-selected",
      "true"
    );

    expect(screen.queryByText("Active Users Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Archived Users Content")).toBeVisible();
  });
});
