import { VoidFunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { Page } from "./components/layout";
import { SkillsContextProvider } from "./context/SkillsContext/SkillsContext";
import { CreatorPage } from "./pages/CreatorPage/CreatorPage";
import { LivePreviewerPage } from "./pages/LivePreviewerPage/LivePreviewerPage";
import { ManageLanguageProficiencies } from "./pages/ManageLanguageProficiencies/ManageLanguageProficiencies";
import { ManageLanguagesPage } from "./pages/ManageLanguagesPage/ManageLanguagesPage";
import { ManageUsersPage } from "./pages/ManageUsersPage/ManageUsersPage";
import { PDFPreviewerPage } from "./pages/PdfPreviewer/PDFPreviewerPage";
import { SkillsEditorPage } from "./pages/SkillsEditor/SkillsEditorPage";

export const AppRouter: VoidFunctionComponent = () => (
  <SkillsContextProvider>
    <Routes>
      <Route path="/pdf-preview/:id" element={<PDFPreviewerPage />} />
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
      <Route path="/languages" element={<ManageLanguagesPage />} />
      <Route path="/proficiencies" element={<ManageLanguageProficiencies />} />
    </Routes>
  </SkillsContextProvider>
);
