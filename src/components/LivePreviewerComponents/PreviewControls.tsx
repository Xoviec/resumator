import React, { FunctionComponent } from "react";
import { Box, Button } from "@material-ui/core";
import { DropdownButton, SpacedButton } from "../Material";
import downloadResume from "../../lib/downloadResume";
// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/Save";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface PreviewControlsProps {
  resume: any;
  goTo: (path: string) => void;
  setShowPDFModal: (show: boolean) => void;
  onSaveClicked: () => void;
}

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({ resume, goTo, setShowPDFModal, onSaveClicked }) => {
  return (
    <Box display="flex" padding={2} paddingTop={0} flexDirection="row" justifyContent="space-between">
      {/* Back to overview */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => goTo(`/overview`)}
      >
        Back to overview
      </Button>
      <Box>
        {/* Download as */}
        <DropdownButton
          variant="contained"
          actions={["PDF", "DOCX"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
        >
          Download as..
        </DropdownButton>
        {/* Preview */}
        <SpacedButton
          variant="contained"
          marginX={1}
          startIcon={<VisibilityIcon />}
          onClick={() => setShowPDFModal(true)}
        >
          Preview
        </SpacedButton>
        {/* Save */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={onSaveClicked}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
