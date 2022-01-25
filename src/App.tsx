import { FunctionComponent, VoidFunctionComponent } from "react";
import {
  BrowserRouter,
  Redirect,
  Route as RouterRoute,
  RouteProps,
  Switch,
} from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import {
  FirebaseAppContextProvider,
  useFirebaseApp,
} from "./context/FirebaseContext/FirebaseContext";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import { CreatorPage } from "./pages/CreatorPage/CreatorPage";
import { ManageUsersPage } from "./pages/ManageUsersPage/ManageUsersPage";
import { LivePreviewerPage } from "./pages/LivePreviewerPage/LivePreviewerPage";
import { LoginPage } from "./pages/LoginPage";
import { UserRedirect } from "./pages/Overview/UserRedirect";
import { PDFPreviewerPage } from "./pages/PdfPreviewer/PDFPreviewerPage";
import { SkillsEditorPage } from "./pages/SkillsEditor/SkillsEditorPage";
import theme from "./config/theme";
import { AppStateContextProvider } from "./context/AppStateContext/AppStateContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

export const App: VoidFunctionComponent = () => {
  return (
    <AppStateContextProvider>
      <DndProvider backend={HTML5Backend}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <FirebaseAppContextProvider>
              <BrowserRouter>
                <Switch>
                  <Route
                    exact
                    type="private"
                    path={["/", "/skills", "/new", "/resume/:id", "/users"]}
                  >
                    <SkillsContextProvider>
                      <RouterRoute exact path="/" component={LivePreviewerPage} />
                      <RouterRoute
                        exact
                        path="/resume/:id"
                        component={LivePreviewerPage}
                      />
                      <RouterRoute
                        exact
                        path="/skills"
                        component={SkillsEditorPage}
                      />
                      <RouterRoute exact path="/new" component={CreatorPage} />
                      <RouterRoute exact path="/users" component={ManageUsersPage} />
                    </SkillsContextProvider>
                  </Route>
                  <Route
                    type="private"
                    exact
                    path="/pdf-preview/:id/"
                    component={PDFPreviewerPage}
                  />
                  <Route
                    type="anonymous"
                    exact
                    path="/login"
                    component={LoginPage}
                  />
                </Switch>
              </BrowserRouter>
            </FirebaseAppContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </DndProvider>
    </AppStateContextProvider>
  );
};

type RouteType = "private" | "anonymous";

const Route: FunctionComponent<RouteProps & { type: RouteType }> = ({
  component: Component,
  type,
  path,
  ...rest
}) => {
  const { userRecord, isLoading, firebase } = useFirebaseApp();

  if (isLoading) {
    return null;
  }

  switch (type) {
    case "private": {
      if (userRecord) return <RouterRoute {...rest} component={Component} />;
      return <Redirect to="/login" />;
    }
    case "anonymous": {
      if (!userRecord && path !== "/login") return <Redirect to="/login" />;

      if (!userRecord && path === "/login")
        return <RouterRoute {...rest} component={Component} />;

      // Redirect existing user to his resume if it exists
      return (
        <UserRedirect
          userRecord={userRecord}
          query={firebase
            .firestore()
            .collection("resumes")
            .where("personalia.email", "==", userRecord?.email)}
        />
      );
    }
    default:
      throw new Error("Unhandled Route");
  }
};
