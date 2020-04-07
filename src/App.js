import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import PdfCreator from "./pages/PdfCreator";
import PdfPreviewer from "./pages/PdfPreviewer";
import LoginLayout from "./layouts/Login";
import CreatorLayout from "./layouts/Creator";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePageWrapper} />
        <Route exact path="/creator" component={PdfCreatorWrapper} />
        <Route exact path="/previewer" component={PdfPreviewerWrapper} />
      </Switch>
    </BrowserRouter>
  );
}

const HomePageWrapper = () => {
  return (
    <LoginLayout>
      <HomePage />
    </LoginLayout>
  );
};

const PdfCreatorWrapper = () => {
  return (
    <CreatorLayout>
      <PdfCreator />
    </CreatorLayout>
  );
};

const PdfPreviewerWrapper = () => {
  return (
    <LoginLayout>
      <PdfPreviewer />
    </LoginLayout>
  );
};

export default App;
