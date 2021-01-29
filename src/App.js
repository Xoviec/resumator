import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";

import Overview from "./pages/Overview";
import Home from "./pages/Home";
import PdfPreviewer from "./pages/PdfPreviewer";
import FirebaseAppContextProvider, {
  FirebaseAppContext,
} from "./context/FirebaseContext";
import HTMLPreviewer from "./pages/HTMLPreviewer";
import LivePreviewer from "./pages/LivePreviewer";
import Creator from "./pages/Creator";

function App() {
  return (
    <FirebaseAppContextProvider>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute
            type="private"
            exact
            path="/overview"
            component={OverviewWrapper}
          />
          <ProtectedRoute
            type="private"
            exact
            path="/live/:id"
            component={LivePreviewerWrapper}
          />
          <ProtectedRoute
            type="private"
            exact
            path="/creator"
            component={CreatorWrapper}
          />
          <ProtectedRoute
            type="private"
            exact
            path="/pdf-preview/:id/"
            component={PdfPreviewer}
          />
          <ProtectedRoute
            type="private"
            exact
            path="/html-previewer"
            component={HTMLPreviewerWrapper}
          />
          <ProtectedRoute type="anonymous" path="/" component={HomePageWrapper} />
        </Switch>
      </BrowserRouter>
    </FirebaseAppContextProvider>
  );
}

const ProtectedRoute = ({ component: Component, type, ...rest }) => {
  const { user, isLoading } = React.useContext(FirebaseAppContext);

  if (isLoading) {
    return null;
  }

  switch (type) {
    case "private": {
      if (user) return <Route {...rest} component={Component} />;
      return <Redirect to="/" />;
    }
    case "anonymous": {
      if (!user) return <Route {...rest} component={Component} />;
      return <Redirect to="/overview" />;
    }
    default:
  }
  throw new Error("Unhandled Route");
};

const HomePageWrapper = (props) => (
  <LoginLayout>
    <Home {...props} />
  </LoginLayout>
);

const OverviewWrapper = (props) => (
  <MainLayout>
    <Overview {...props} />
  </MainLayout>
);

const LivePreviewerWrapper = (props) => (
  <MainLayout>
    <LivePreviewer {...props} />
  </MainLayout>
);

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
