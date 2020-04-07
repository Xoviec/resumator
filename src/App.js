import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import PdfPreviewer from "./pages/PdfPreviewer";
import LoginLayout from "./pages/layout/LoginLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePageWrapper} />
          <Route exact path="/previewer" component={PdfPreviewerWrapper} />
        </Switch>
      </div>
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
const PdfPreviewerWrapper = () => {
  return (
    <LoginLayout>
      <PdfPreviewer />
    </LoginLayout>
  );
};

export default App;
