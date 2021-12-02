import styled from "@emotion/styled";
import { VoidFunctionComponent } from "react";
import { useHistory } from "react-router";
import { PersonaliaDialog } from "../../components/LivePreviewerComponents/PersonaliaDialog";
import { PersonaliaModel } from "../../components/LivePreviewerComponents/TopSection";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";
import { initialResumeData } from "../../config/initialData";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { MainLayout } from "../../layouts/MainLayout";

interface PersonaliaAndIntroduction extends PersonaliaModel {
  introduction: string;
}

export const CreatorPage: VoidFunctionComponent = () => {
  const history = useHistory();
  const { firebase } = useFirebaseApp();

  // TODO: this propagates to other parts as well, it would be nice to not have to define initial values here
  const initialPersonalia: PersonaliaAndIntroduction = {
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    city: "",
    introduction: "",
    dateOfBirth: null,
  };

  return (
    <MainLayout>
      <OverviewDrawer>
        <LivePreviewContainer>
          <PersonaliaDialog
            data={initialPersonalia}
            open={true}
            onCancel={() => {
              history.push("/");
            }}
            onSave={async (formData) => {
              try {
                const { introduction, ...personalia } = formData;
                const doc = firebase.firestore().collection("resumes").doc();

                await doc.set({ ...initialResumeData, personalia, introduction });

                history.push(`/resume/${doc.id}`);
              } catch (e) {
                alert(
                  `Error adding document. ${
                    e instanceof Error ? `${e.message}` : ""
                  }`
                );
              }
            }}
          />
        </LivePreviewContainer>
      </OverviewDrawer>
    </MainLayout>
  );
};

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;
