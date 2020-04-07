import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import PdfPreviewer from "./pages/PdfPreviewer";
import LoginLayout from "./pages/layout/LoginLayout";
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
      <BrowserRouter>
        <div className="App">
          <FirebaseTest />
          <Switch>
            <Route exact path="/" component={HomePageWrapper} />
            <Route exact path="/previewer" component={PdfPreviewerWrapper} />
          </Switch>
        </div>
      </BrowserRouter>
    </FirebaseAppContextProvider>
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
