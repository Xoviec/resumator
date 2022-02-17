import styled from "@emotion/styled";
import { Alert, Snackbar } from "@mui/material";
import { VoidFunctionComponent, useState } from "react";
import { useHistory } from "react-router";
import { PersonaliaDialog } from "../../components/LivePreviewerComponents/PersonaliaDialog";
import { PersonaliaModel } from "../../components/LivePreviewerComponents/TopSection";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";
import { initialResumeData } from "../../config/initialData";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useResumeContext } from "../../context/ResumeContext/ResumeContext";
import { MainLayout } from "../../layouts/MainLayout";

const INITIAL_DATA = {
  ...initialResumeData.personalia,
  dateOfBirth: null,
  introduction: initialResumeData.introduction,
};

export const CreatorPage: VoidFunctionComponent = () => {
  const history = useHistory();
  const { firebase } = useFirebaseApp();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { getResumePromise } = useResumeContext();

  const [initialData, setInitialData] = useState<
    PersonaliaModel & { introduction: string | undefined }
  >(INITIAL_DATA);

  return (
    <MainLayout>
      <OverviewDrawer>
        <LivePreviewContainer>
          <PersonaliaDialog
            data={initialData}
            open={true}
            onCancel={() => {
              history.push("/");
            }}
            onSave={async (formData) => {
              try {
                const { introduction, ...personalia } = formData;
                const resume = await getResumePromise(formData.email);
                if (resume?.docs[0]?.exists) {
                  setInitialData(formData);
                  return setOpenSnackbar(true);
                }
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
          <Snackbar
            open={openSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => setOpenSnackbar(false)}
            autoHideDuration={6000}
          >
            <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
              This user has an existing resume
            </Alert>
          </Snackbar>
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
