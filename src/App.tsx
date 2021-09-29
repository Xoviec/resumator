import { FunctionComponent, VoidFunctionComponent } from "react";
import {
  BrowserRouter,
  Redirect,
  Route as RouterRoute,
  RouteProps,
  Switch,
} from "react-router-dom";
import FirebaseAppContextProvider, {
  useFirebaseApp,
} from "./context/FirebaseContext";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import { CreatorPage } from "./pages/CreatorPage/CreatorPage";
import { LivePreviewerPage } from "./pages/LivePreviewerPage/LivePreviewerPage";
import { LoginPage } from "./pages/LoginPage";
import { UserRedirect } from "./pages/Overview/UserRedirect";
import { PDFPreviewerPage } from "./pages/PdfPreviewer/PDFPreviewerPage";
import { SkillsEditorPage } from "./pages/SkillsEditor/SkillsEditorPage";

export const App: VoidFunctionComponent = () => {
  return (
    <FirebaseAppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact type="private" path={["/", "/skills", "/new", "/resume/:id"]}>
            <SkillsContextProvider>
              <RouterRoute exact path="/" component={LivePreviewerPage} />
              <RouterRoute exact path="/resume/:id" component={LivePreviewerPage} />
              <RouterRoute exact path="/skills" component={SkillsEditorPage} />
              <RouterRoute exact path="/new" component={CreatorPage} />
            </SkillsContextProvider>
          </Route>
          <Route
            type="private"
            exact
            path="/pdf-preview/:id/"
            component={PDFPreviewerPage}
          />
          <Route type="anonymous" exact path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </FirebaseAppContextProvider>
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
