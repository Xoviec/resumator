import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";

import Overview from "./pages/Overview";
import Home from "./pages/Home";
import PdfCreator from "./pages/PdfCreator";
import PdfPreviewer from "./pages/PdfPreviewer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePageWrapper} />
        <Route exact path="/overview" component={OverviewWrapper} />
        <Route exact path="/creator" component={PdfCreatorWrapper} />
        <Route exact path="/previewer" component={PdfPreviewerWrapper} />
      </Switch>
    </BrowserRouter>
  );
}

const HomePageWrapper = () => (
  <LoginLayout>
    <Home />
  </LoginLayout>
);

const PdfCreatorWrapper = () => (
  <MainLayout>
    <PdfCreator />
  </MainLayout>
);

const OverviewWrapper = () => (
  <MainLayout>
    <Overview />
  </MainLayout>
);

const PdfPreviewerWrapper = () => (
  <LoginLayout>
    <PdfPreviewer />
  </LoginLayout>
);

export default App;
