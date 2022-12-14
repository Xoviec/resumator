import ArchiveIcon from "@mui/icons-material/Archive";
// Icons
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { downloadResume } from "../../lib/downloadResume";
import { DropdownButton, SpacedButton } from "../Material";
import { ResumeModel } from "./ResumeModel";

export enum ThemeStyle {
  iO = "iO",
}

export interface PreviewControlsProps {
  resume: ResumeModel;
  setShowPDFModal: (show: boolean) => void;
  setThemeStyle: (themeStyle: ThemeStyle) => void;
  onToggleIsArchived: () => void;
}

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({
  resume,
  setShowPDFModal,
  setThemeStyle,
  onToggleIsArchived,
}) => {
  const location = useLocation();
  const isCreatorPage = location.pathname.includes("new");

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
      <Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap="15px">
        {/* Download as */}
        <DropdownButton
          variant="contained"
          actions={["PDF_iO"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
          color="primary"
        >
          Download as..
        </DropdownButton>
        {/* Preview */}
        {/* <SpacedButton
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => setShowPDFModal(true)}
          color="primary"
        >
          Preview
        </SpacedButton> */}
        <DropdownButton
          variant="contained"
          actions={["iO"]}
          startIcon={<VisibilityIcon />}
          onClick={(action) => {
            setShowPDFModal(true);
            setThemeStyle(action as ThemeStyle);
          }}
          color="primary"
        >
          Preview
        </DropdownButton>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        gap="15px"
        marginLeft={2}
      >
        <SpacedButton
          variant="contained"
          startIcon={<ArchiveIcon />}
          onClick={onToggleIsArchived}
          color="primary"
        >
          {!resume.isArchived ? "Archive" : "Unarchive"}
        </SpacedButton>
      </Box>
    </Box>
  );
};
