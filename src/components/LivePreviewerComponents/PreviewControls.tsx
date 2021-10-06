import { FunctionComponent } from "react";
import { Box, Button } from "@material-ui/core";
import { DropdownButton, SpacedButton } from "../Material";
import downloadResume from "../../lib/downloadResume";
// Icons
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArchiveIcon from "@material-ui/icons/Archive";
import { useHistory, NavLink } from "react-router-dom";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { ResumeModel } from "./ResumeModel";

interface PreviewControlsProps {
  resume: ResumeModel;
  setShowPDFModal: (show: boolean) => void;
}

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({
  resume,
  setShowPDFModal,
}) => {
  const { firebase } = useFirebaseApp();
  const history = useHistory();
  const isCreatorPage = history.location.pathname.includes("new");

  const archiveResume = (isArchived = true) => {
    if (!resume.id) return;
    firebase.firestore().collection("resumes").doc(resume.id).update({ isArchived });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom={2}
    >
      {isCreatorPage && (
        <Box>
          <Button color="primary" variant="contained" component={NavLink} to="/">
            Go to overview
          </Button>
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        gridGap={15}
        marginLeft={2}
      >
        {/* Download as */}
        <DropdownButton
          variant="contained"
          actions={["PDF", "DOCX"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
          color="primary"
        >
          Download as..
        </DropdownButton>
        {/* Preview */}
        <SpacedButton
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => setShowPDFModal(true)}
          color="primary"
        >
          Preview
        </SpacedButton>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        gridGap={15}
        marginLeft={2}
      >
        <SpacedButton
          variant="contained"
          startIcon={<ArchiveIcon />}
          onClick={() => archiveResume(!resume.isArchived)}
          color="primary"
        >
          {!resume.isArchived ? "Archive" : "Unarchive"}
        </SpacedButton>
      </Box>
    </Box>
  );
};
