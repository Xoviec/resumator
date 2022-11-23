import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { VoidFunctionComponent } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./Router";
import { theme } from "./config/theme";
import { AppStateContextProvider } from "./context/AppStateContext/AppStateContext";
import { FirebaseAppContextProvider } from "./context/FirebaseContext/FirebaseContext";
import { ResumeProvider } from "./context/ResumeContext/ResumeContext";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./utils/requireAuth";

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
                    <Route element={<RequireAuth />}>
                      <Route path="*" element={<AppRouter />} />
                    </Route>
                  </Routes>
                </ResumeProvider>
              </BrowserRouter>
            </FirebaseAppContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </DndProvider>
    </AppStateContextProvider>
  );
};
