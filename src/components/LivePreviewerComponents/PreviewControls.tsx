import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { DropdownButton, SpacedButton } from "../Material";
import downloadResume from "../../lib/downloadResume";
// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { FirebaseAppContext } from "../../context/FirebaseContext";

interface PreviewControlsProps {
  resume: any;
  goTo: (path: string) => void;
  setShowPDFModal: (show: boolean) => void;
}

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({
  resume,
  goTo,
  setShowPDFModal,
}) => {
  const { user }: { user: any } = useContext(FirebaseAppContext);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.hasOwnProperty("userRec") &&
      user.userRec &&
      user.userRec.hasOwnProperty("isManager") &&
      user.userRec.isManager
    ) {
      setIsManager(true);
    }
  }, [user]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom={3}
    >
      <Box>
        {/* Back to overview */}
        {isManager && (
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => goTo(`/overview`)}
            color="primary"
          >
            Back to overview
          </Button>
        )}
      </Box>
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
    </Box>
  );
};
