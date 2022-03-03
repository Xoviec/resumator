import { VoidFunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RequireAuth from "./utils/requireAuth";
import { ResumeProvider } from "./context/ResumeContext/ResumeContext";

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
                        <Route path="/" element={<LivePreviewerPage />} />
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
