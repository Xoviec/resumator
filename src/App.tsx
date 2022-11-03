import { VoidFunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { FirebaseAppContextProvider } from "./context/FirebaseContext/FirebaseContext";
import { CreatorPage } from "./pages/CreatorPage/CreatorPage";
import { ManageUsersPage } from "./pages/ManageUsersPage/ManageUsersPage";
import { LivePreviewerPage } from "./pages/LivePreviewerPage/LivePreviewerPage";
import { LoginPage } from "./pages/LoginPage";
import { PDFPreviewerPage } from "./pages/PdfPreviewer/PDFPreviewerPage";
import { SkillsEditorPage } from "./pages/SkillsEditor/SkillsEditorPage";
import { AppStateContextProvider } from "./context/AppStateContext/AppStateContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ResumeProvider } from "./context/ResumeContext/ResumeContext";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import RequireAuth from "./utils/requireAuth";
import theme from "./config/theme";
import "./App.css";
import { Page } from "./components/layout";

export const App: VoidFunctionComponent = () => {
  return (
    <AppStateContextProvider>
      <DndProvider backend={HTML5Backend}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <FirebaseAppContextProvider>
              <BrowserRouter>
                <ResumeProvider>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                  </Routes>
                  <SkillsContextProvider>
                    <Routes>
                      <Route element={<RequireAuth />}>
                        <Route
                          path="/pdf-preview/:id"
                          element={<PDFPreviewerPage />}
                        />
                        <Route
                          path="/"
                          element={
                            <Page title="Overview">
                              <LivePreviewerPage />
                            </Page>
                          }
                        />
                        <Route path="/resume/:id" element={<LivePreviewerPage />} />
                        <Route path="/new" element={<CreatorPage />} />
                        <Route path="/users" element={<ManageUsersPage />} />
                        <Route path="/skills" element={<SkillsEditorPage />} />
                      </Route>
                    </Routes>
                  </SkillsContextProvider>
                </ResumeProvider>
              </BrowserRouter>
            </FirebaseAppContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </DndProvider>
    </AppStateContextProvider>
  );
};
