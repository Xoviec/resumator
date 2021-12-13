import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { mocked } from "jest-mock";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import {
  PDFPreviewerPage,
  PDFPreviewerPageProps,
  PDFTemplateWrapperProps,
} from "./PDFPreviewerPage";
// import { useResume } from "../../hooks/useResume";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { prettyDOM } from "@testing-library/dom";
import { EducationModel } from "../../components/LivePreviewerComponents/EducationItem";
// import { useDocument } from "react-firebase-hooks/firestore";

const ThemeProviderWrapper: FunctionComponent = ({ children }) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("../../context/FirebaseContext/FirebaseContext");
jest.mock("../../context/SkillsContext/SkillsContext");
jest.mock("../../context/AppStateContext/AppStateContext");

describe("PDFPreview", () => {
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
              doc: jest.fn(),
            }),
          },
        } as any)
    );
  });

  it("Should render loading", async () => {
    const history = createMemoryHistory();
    const props = { match: { params: { id: "" } } } as PDFPreviewerPageProps;
    const useResume = jest.fn();
    const useDocument = jest.fn();

    mocked(useResume).mockReturnValue({
      resume: {} as ResumeModel,
      loading: true,
      error: undefined,
    });

    mocked(useDocument).mockReturnValue({
      value: {},
      loading: true,
      error: undefined,
    });

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <PDFPreviewerPage {...props} />
        </ThemeProviderWrapper>
      </Router>
    );
  });
  it("Should render error", async () => {
    const useResume = jest.fn();
    const useDocument = jest.fn();
    mocked(useResume).mockReturnValue({
      resume: {} as ResumeModel,
      loading: false,
      error: { message: "Error" },
    });
    mocked(useDocument).mockReturnValue({
      value: {},
      loading: false,
      error: { message: "Error" },
    });
    const history = createMemoryHistory();
    const props = { match: { params: { id: "" } } } as PDFPreviewerPageProps;

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <PDFPreviewerPage {...props} />
        </ThemeProviderWrapper>
      </Router>
    );
  });
  it("Should render resume", async () => {
    const useResume = jest.fn();
    const useDocument = jest.fn();
    mocked(useResume).mockReturnValue({
      resume: {
        isImport: false,
        id: "Some id",
        isArchived: false,
        education: [],
        projects: [],
        experience: [],
        skills: [],
        sideProjects: [],
        publications: [],
        socialLinks: [],
        personalia: {
          avatar: "string",
          firstName: "string",
          lastName: "string",
          email: "string",
          city: "string",
          dateOfBirth: null,
        },
        introduction: "Intro",
      } as ResumeModel,
      loading: false,
      error: undefined,
    });
    mocked(useDocument).mockReturnValue({
      value: {
        isImport: false,
        id: "Some id",
        isArchived: false,
        education: [],
        projects: [],
        experience: [],
        skills: [],
        sideProjects: [],
        publications: [],
        socialLinks: [],
        personalia: {
          avatar: "string",
          firstName: "string",
          lastName: "string",
          email: "string",
          city: "string",
          dateOfBirth: null,
        },
        introduction: "Intro",
      },
      loading: false,
      error: undefined,
    });
    const history = createMemoryHistory();
    const props = { match: { params: { id: "Some id" } } } as PDFPreviewerPageProps;

    render(
      <Router history={history}>
        <ThemeProviderWrapper>
          <PDFPreviewerPage {...props} />
        </ThemeProviderWrapper>
      </Router>
    );
  });
});
