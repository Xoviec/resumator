import React, { FunctionComponent } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
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
  showBackToOverviewButton: boolean;
  onSaveClicked: () => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
    "&--action": {
      marginRight: theme.spacing(2),
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
}));

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({
  resume,
  goTo,
  setShowPDFModal,
  showBackToOverviewButton,
  onSaveClicked,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box>
        {/* Back to overview */}
        {showBackToOverviewButton && (
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => goTo(`/overview`)}
            className={classes.button}
          >
            Back to overview
          </Button>
        )}
      </Box>
      <Box marginLeft={2}>
        {/* Download as */}
        <DropdownButton
          variant="contained"
          actions={["PDF", "DOCX"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
          className={`${classes.button} ${classes.button}--action`}
        >
          Download as..
        </DropdownButton>
        {/* Preview */}
        <SpacedButton
          variant="contained"
          // marginX={1}
          startIcon={<VisibilityIcon />}
          className={`${classes.button} ${classes.button}--action`}
          onClick={() => setShowPDFModal(true)}
        >
          Preview
        </SpacedButton>
        {/* Save */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          className={`${classes.button} ${classes.button}--action`}
          onClick={onSaveClicked}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
