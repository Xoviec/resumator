import { TabContext } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen, fireEvent } from "@testing-library/react";
import { prettyDOM, waitFor, within } from "@testing-library/dom";
import { FunctionComponent } from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { useCollection } from "react-firebase-hooks/firestore";
import { mocked } from "jest-mock";
import userEvent from "@testing-library/user-event";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { OverviewList } from "./OverviewList";

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("react-firebase-hooks/firestore", () => ({
  ...jest.requireActual("react-firebase-hooks/firestore"),
  useCollection: jest.fn(),
}));

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const getExampleResumeQueryResult = () => ({
  docs: [
    {
      id: "resume-user1",
      data: () => ({
        personalia: {
          firstName: "User1Name",
          lastName: "User1Surname",
        },
        isArchived: false,
      }),
    },
    {
      id: "resume-user2",
      data: () => ({
        personalia: {
          firstName: "User2Name",
          lastName: "User2Surname",
        },
        isArchived: false,
      }),
    },
    {
      id: "resume-archived1",
      data: () => ({
        personalia: {
          firstName: "Archived1Name",
          lastName: "Archived1Surname",
        },
        isArchived: true,
      }),
    },
  ],
});

describe("OverviewList", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mocked(useCollection).mockReturnValue([
      getExampleResumeQueryResult(),
      false,
      null,
    ] as any);
    mocked(useFirebaseApp).mockReturnValue({
      firebase: {
        firestore: jest.fn().mockReturnValue({ collection: jest.fn() }),
      },
      userRecord: { isManager: true },
    } as any);
  });

  it("should render nothing if user is not manager", () => {
    mocked(useFirebaseApp).mockReturnValue({
      firebase: { firestore: jest.fn().mockReturnValue({ collection: jest.fn() }) },
      userRecord: {},
    } as any);
    mocked(useCollection).mockReturnValue([null, false, null] as any);

    render(
      <ThemeProviderWrapper>
        <OverviewList searchTerms="" />
      </ThemeProviderWrapper>
    );

    expect(screen.queryByTestId("overview-list-container")).not.toBeInTheDocument();
  });

  it("should show active resumes", () => {
    render(
      <Router history={createMemoryHistory()}>
        <ThemeProviderWrapper>
          <TabContext value="active-users-tab">
            <OverviewList searchTerms="" />
          </TabContext>
        </ThemeProviderWrapper>
      </Router>
    );

    expect(screen.getByText(/User1Name User1Surname/)).toBeInTheDocument();
  });

  it("should show archived resumes", () => {
    render(
      <Router history={createMemoryHistory()}>
        <ThemeProviderWrapper>
          <TabContext value="archived-users-tab">
            <OverviewList searchTerms="" />
          </TabContext>
        </ThemeProviderWrapper>
      </Router>
    );

    expect(screen.getByText(/Archived1Name Archived1Surname/)).toBeInTheDocument();
  });

  it("should go to resume page when clicked on resume", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <TabContext value="active-users-tab">
            <OverviewList searchTerms="" />
          </TabContext>
        </ThemeProviderWrapper>
      </Router>
    );

    userEvent.click(screen.getByText(/User2Name User2Surname/));
    expect(history.location.pathname).toEqual("/resume/resume-user2");
  });

  describe("DeleteConfirmationDialog", () => {
    const prepareDeleteConfirmationDialog = () => {
      render(
        <Router history={createMemoryHistory()}>
          <ThemeProviderWrapper>
            <TabContext value="active-users-tab">
              <OverviewList searchTerms="" />
            </TabContext>
          </ThemeProviderWrapper>
        </Router>
      );

      const resume2Container = screen
        .getByText(/User2Name User2Surname/)
        .closest("a");

      if (!resume2Container) {
        throw new Error("Resume 2 container not found");
      }

      const deleteButton = within(resume2Container).getByLabelText("delete");

      // it would be better if we find a way to allow opacity to become 1 with hover
      // and then we can use userEvent instead of fireEvent
      fireEvent.click(deleteButton);
    };

    it("should close dialog when clicked No", async () => {
      prepareDeleteConfirmationDialog();

      const dialog = screen.getByRole("dialog");

      expect(
        within(dialog).getByText(/Are you sure you want to delete/)
      ).toBeInTheDocument();

      userEvent.click(within(dialog).getByText(/No/));

      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });

    it("should delete resume when clicked Yes", async () => {
      const doc = jest.fn();
      const collection = jest.fn().mockReturnValue({
        doc,
      });
      doc.mockReturnValue({ delete: jest.fn().mockResolvedValue(null) });

      mocked(useFirebaseApp).mockReturnValue({
        firebase: {
          firestore: jest.fn().mockReturnValue({ collection }),
        },
        userRecord: { isManager: true },
      } as any);

      prepareDeleteConfirmationDialog();

      const dialog = screen.getByRole("dialog");

      expect(
        within(dialog).getByText(/Are you sure you want to delete/)
      ).toBeInTheDocument();

      userEvent.click(within(dialog).getByText(/Yes/));

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
      expect(doc).toHaveBeenCalledWith("resume-user2");
    });
  });
});
