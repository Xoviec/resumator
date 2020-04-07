import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import PdfPreviewer from "./pages/PdfPreviewer";
import Layout from "./pages/layout/Layout";

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
    <Layout>
      <HomePage />
    </Layout>
  );
};
const PdfPreviewerWrapper = () => {
  return (
    <Layout>
      <PdfPreviewer />
    </Layout>
  );
};

export default App;
