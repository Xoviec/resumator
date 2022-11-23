import styled from "@emotion/styled";
import { Alert, Snackbar } from "@mui/material";
import { VoidFunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonaliaDialog } from "../../components/LivePreviewerComponents/PersonaliaDialog";
import { PersonaliaModel } from "../../components/LivePreviewerComponents/TopSection";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";
import { Page } from "../../components/layout";
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
  const navigate = useNavigate();
  const { firebase } = useFirebaseApp();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { getResumePromise } = useResumeContext();

  const [initialData, setInitialData] = useState<
    PersonaliaModel & { introduction: string | undefined }
  >(INITIAL_DATA);

  return (
    <Page title="Create New Resume">
      <MainLayout>
        <OverviewDrawer>
          <LivePreviewContainer>
            <PersonaliaDialog
              data={initialData}
              open={true}
              onCancel={() => {
                navigate("/");
              }}
              onSave={async (formData) => {
                try {
                  const { introduction, ...personalia } = formData;
                  const results = await getResumePromise(formData.email);
                  const result = results[0].docs?.[0]?.id ? results[0] : results[1];
                  if (result?.docs[0]?.exists) {
                    setInitialData(formData);
                    return setOpenSnackbar(true);
                  }
                  const doc = firebase.firestore().collection("resumes").doc();

                  await doc.set({ ...initialResumeData, personalia, introduction });

                  navigate(`/resume/${doc.id}`);
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
    </Page>
  );
};

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;
