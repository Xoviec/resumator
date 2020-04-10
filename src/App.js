import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";

import Overview from "./pages/Overview";
import Home from "./pages/Home";
import PdfCreator from "./pages/PdfCreator";
import PdfPreviewer from "./pages/PdfPreviewer";
import CreatorLayout from "./layouts/Creator";
import FirebaseAppContextProvider from "./context/FirebaseContext";
import FirebaseTest from "./components/FirebaseTest";

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
  REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
  REACT_APP_FIREBASE_PROJECT_ID: projectId,
  REACT_APP_FIREBASE_STPRAGE_BUCKET: storageBucket,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  REACT_APP_FIREBASE_APP_ID: appId,
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
function App() {
  return (
    <FirebaseAppContextProvider config={firebaseConfig}>
      <FirebaseTest />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePageWrapper} />
          <Route exact path="/overview" component={OverviewWrapper} />
          <Route exact path="/creator" component={PdfCreatorWrapper} />
          <Route exact path="/previewer" component={PdfPreviewerWrapper} />
        </Switch>
      </BrowserRouter>
    </FirebaseAppContextProvider>
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
