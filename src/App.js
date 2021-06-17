import React from "react";
import {
  BrowserRouter,
  Route as RouterRoute,
  Switch,
  Redirect,
} from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";
import Login from "./pages/Login";
import PdfPreviewer from "./pages/PdfPreviewer";
import FirebaseAppContextProvider, {
  FirebaseAppContext,
} from "./context/FirebaseContext";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import HTMLPreviewer from "./pages/HTMLPreviewer";
import LivePreviewer from "./pages/LivePreviewer";
import OverviewDrawer from "./components/OverviewDrawer";
import Creator from "./pages/Creator";
import SkillsEditor from "./pages/SkillsEditor";

import { UserRedirect } from "./pages/Overview/UserRedirect";

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
  const { user, isLoading, firebase } = React.useContext(FirebaseAppContext);

  if (isLoading) {
    return null;
  }

  console.log(
    "Vlad trying to switch arround private and anonymous shit",
    user,
    path,
    type
  );
  switch (type) {
    case "private": {
      if (user) return <RouterRoute {...rest} component={Component} />;
      return <Redirect to="/login" />;
    }
    case "anonymous": {
      if (!user && path !== "/login") return <Redirect to="/login" />;

      if (!user && path === "/login")
        return <RouterRoute {...rest} component={Component} />;

      // Redirect existing user to his resume if it exists
      return (
        <UserRedirect
          firebase={firebase}
          user={user}
          query={firebase
            .firestore()
            .collection("resumes")
            .where("personalia.email", "==", user.email)}
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
    <Creator {...props} />
  </MainLayout>
);
const HTMLPreviewerWrapper = (props) => (
  <LoginLayout>
    <HTMLPreviewer {...props} />
  </LoginLayout>
);

export default App;
