import { VoidFunctionComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { FirebaseAppContextProvider } from "./context/FirebaseContext/FirebaseContext";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import { CreatorPage } from "./pages/CreatorPage/CreatorPage";
import { ManageUsersPage } from "./pages/ManageUsersPage/ManageUsersPage";
import { LivePreviewerPage } from "./pages/LivePreviewerPage/LivePreviewerPage";
import { LoginPage } from "./pages/LoginPage";

import { PDFPreviewerPage } from "./pages/PdfPreviewer/PDFPreviewerPage";
import { SkillsEditorPage } from "./pages/SkillsEditor/SkillsEditorPage";
import theme from "./config/theme";
import { AppStateContextProvider } from "./context/AppStateContext/AppStateContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { PrivateRoute } from "./utils/privateRoute";

export const App: VoidFunctionComponent = () => {
  return (
    <AppStateContextProvider>
      <DndProvider backend={HTML5Backend}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <FirebaseAppContextProvider>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/login" component={LoginPage} />
                  <SkillsContextProvider>
                    <PrivateRoute exact path="/" component={LivePreviewerPage} />
                    <PrivateRoute path="/resume/:id" component={LivePreviewerPage} />
                    <PrivateRoute path="/new" component={CreatorPage} />
                    <PrivateRoute path="/users" component={ManageUsersPage} />
                    <PrivateRoute path="/skills" component={SkillsEditorPage} />
                  </SkillsContextProvider>
                  <PrivateRoute
                    path="/pdf-preview/:id/"
                    component={PDFPreviewerPage}
                  />
                </Switch>
              </BrowserRouter>
            </FirebaseAppContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </DndProvider>
    </AppStateContextProvider>
  );
};
