import React from "react";
import { Box, Button } from "@material-ui/core";
import { SpacedButton } from "../Material";
import DropdownButton from "./DropdownButton";
import downloadResume from "../../lib/downloadResume";
// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveIcon from "@material-ui/icons/Save";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IPreviewControlsProperties {
  resume: any;
  goTo: (path: string) => void;
  setShowPDFModal: (show: boolean) => void;
  onSaveClicked: () => void;
}

const PreviewControls = ({ resume, goTo, setShowPDFModal, onSaveClicked }: IPreviewControlsProperties) => {
  return (
    <Box display="flex" padding={2} paddingTop={0} flexDirection="row" justifyContent="space-between">
      <Button
        variant="contained"
        type="button"
        startIcon={<ArrowBackIcon />}
        onClick={() => goTo(`/overview`)}
      >
        Back to overview
      </Button>

      <Box>
        <DropdownButton
          label="Download as.."
          actions={["PDF", "DOCX"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
        />

        <SpacedButton
          variant="contained"
          type="button"
          marginX={1}
          startIcon={<VisibilityIcon />}
          onClick={() => setShowPDFModal(true)}
        >
          Preview
        </SpacedButton>

        <Button
          variant="contained"
          type="button"
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

export default PreviewControls;
