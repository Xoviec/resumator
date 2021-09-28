import {
  BrowserRouter,
  Redirect,
  Route as RouterRoute,
  Switch,
} from "react-router-dom";
import OverviewDrawer from "./components/OverviewDrawer";
import FirebaseAppContextProvider, {
  useFirebaseApp,
} from "./context/FirebaseContext";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import { LoginLayout } from "./layouts/LoginLayout";
import { MainLayout } from "./layouts/MainLayout";
import Creator from "./pages/Creator";
import HTMLPreviewer from "./pages/HTMLPreviewer";
import LivePreviewer from "./pages/LivePreviewer";
import Login from "./pages/Login";
import { UserRedirect } from "./pages/Overview/UserRedirect";
import PdfPreviewer from "./pages/PdfPreviewer";
import SkillsEditor from "./pages/SkillsEditor";

function App() {
  return (
    <FirebaseAppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact type="private" path={["/", "/skills", "/new", "/resume/:id"]}>
            <SkillsContextProvider>
              <RouterRoute exact path="/" component={LivePreviewerWrapper} />
              <RouterRoute
                exact
                path="/resume/:id"
                component={LivePreviewerWrapper}
              />
              <RouterRoute exact path="/skills" component={SkillsPageWrapper} />
              <RouterRoute exact path="/new" component={CreatorWrapper} />
            </SkillsContextProvider>
          </Route>
          <Route
            type="private"
            exact
            path="/pdf-preview/:id/"
            component={PdfPreviewer}
          />
          <Route
            type="private"
            exact
            path="/html-previewer"
            component={HTMLPreviewerWrapper}
          />
          <Route type="anonymous" exact path="/login" component={LoginPageWrapper} />
        </Switch>
      </BrowserRouter>
    </FirebaseAppContextProvider>
  );
}

const Route = ({ component: Component, type, path, ...rest }) => {
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
          firebase={firebase}
          userRecord={userRecord}
          query={firebase
            .firestore()
            .collection("resumes")
            .where("personalia.email", "==", userRecord.email)}
        />
      );
    }
    default:
      throw new Error("Unhandled Route");
  }
};

const LoginPageWrapper = (props) => (
  <LoginLayout>
    <Login {...props} />
  </LoginLayout>
);

const SkillsPageWrapper = (props) => (
  <MainLayout>
    <SkillsEditor {...props} />
  </MainLayout>
);

const LivePreviewerWrapper = (props) => {
  return (
    <MainLayout>
      <OverviewDrawer>
        <LivePreviewer {...props} />
      </OverviewDrawer>
    </MainLayout>
  );
};

const CreatorWrapper = (props) => (
  <MainLayout>
    <OverviewDrawer>
      <Creator {...props} />
    </OverviewDrawer>
  </MainLayout>
);

const HTMLPreviewerWrapper = (props) => (
  <LoginLayout>
    <HTMLPreviewer {...props} />
  </LoginLayout>
);

export default App;
