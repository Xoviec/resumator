import { VoidFunctionComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { FirebaseAppContextProvider } from "./context/FirebaseContext/FirebaseContext";
import { LoginPage } from "./pages/LoginPage";
import { AppStateContextProvider } from "./context/AppStateContext/AppStateContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ResumeProvider } from "./context/ResumeContext/ResumeContext";
import { RequireAuth } from "./utils/requireAuth";
import theme from "./config/theme";
import "./App.css";
import { AppRouter } from "./Router";

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
