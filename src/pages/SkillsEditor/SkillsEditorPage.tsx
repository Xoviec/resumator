import { VoidFunctionComponent } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import SkillsEditorList from "./SkillsEditorList";

export const SkillsEditorPage: VoidFunctionComponent = () => {
  return (
    <MainLayout>
      <SkillsEditorList />
    </MainLayout>
  );
};
