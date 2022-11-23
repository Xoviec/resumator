import { TabPanel } from "@mui/lab";
import { useState, VoidFunctionComponent } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { Confirmation } from "../Confirmation/Confirmation";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import OverviewResumeList from "./OverviewResumeList";
import { Box } from "@mui/material";
import { useDeleteResume, useGetResumes } from "../../hooks/data";
import { useSearch } from "./useSearch";

export interface OverviewListProps {
  searchTerms: string;
}

export const OverviewList: VoidFunctionComponent<OverviewListProps> = ({
  searchTerms,
}) => {
  const { userRecord } = useFirebaseApp();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { resumes, hasFetchError } = useGetResumes();
  const { deleteResume, setResumeToDelete, resumeToDelete } = useDeleteResume();
  const { archivedResumes, unarchivedResumes } = useSearch(resumes, searchTerms);

  const onDelete = (resume: ResumeModel) => {
    setOpenConfirmation(true);
    setResumeToDelete(resume);
  };

  const shouldShowList =
    !userRecord?.isManager || (!unarchivedResumes.length && !archivedResumes.length);

  if (shouldShowList) return null;

  return (
    <Box data-testid="overview-list-container">
      {hasFetchError && (
        <span>
          Could not fetch resume data. If this problem persists, notify application
          maintainer
        </span>
      )}
      <TabPanel value="active-users-tab" style={{ padding: 0 }}>
        <OverviewResumeList
          resumes={unarchivedResumes}
          onDelete={onDelete}
          testId="overview-list-active-resumes"
        />
      </TabPanel>
      <TabPanel value="archived-users-tab">
        <OverviewResumeList
          resumes={archivedResumes}
          onDelete={onDelete}
          testId="overview-list-archived-resumes"
        />
      </TabPanel>
      <Confirmation
        isOpen={openConfirmation}
        denyClick={() => setOpenConfirmation(false)}
        confirmClick={() => {
          setOpenConfirmation(false);
          deleteResume(resumeToDelete);
        }}
        title={"Delete item"}
        message={`Are you sure you want to delete this item?
            <br/>
            <strong>"${resumeToDelete?.personalia?.firstName} ${resumeToDelete?.personalia?.lastName} - ${resumeToDelete?.id}"</strong>
            <br/><br/>
            This action cannot be reversed.`}
      />
    </Box>
  );
};
