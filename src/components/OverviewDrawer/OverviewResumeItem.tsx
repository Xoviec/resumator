import {
  Delete as DeleteIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
} from "@mui/icons-material";
import {
  ListItem,
  ListItemSecondaryAction,
  Tooltip,
  Typography,
} from "@mui/material/";
import { styled } from "@mui/system";
import Fuse from "fuse.js";
import { VoidFunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../../config/theme";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { TooltipIconButton } from "../Material";
import { OverviewResumeSecondaryContent } from "./OverviewResumeSecondaryContent";
import { getDisplayName } from "./utils";

const StyledListItem = styled(ListItem)({
  cursor: "pointer",
  alignItems: "top",
  borderBottom: `1px solid ${colors.lightGrey}`,

  "&:hover": {
    backgroundColor: colors.darkGrayOpacity,
  },
  [`&:hover div`]: {
    opacity: 1,
    pointerEvents: "all",
  },
  '&[data-isarchived="true"]': {
    opacity: "0.6",
  },
});

const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)({
  opacity: 0,
  transition: "opacity 150ms ease-out",
  pointerEvents: "none",
  alignSelf: "start",
  flexShrink: 0,
});

const StyledLink = styled(NavLink)({
  color: colors.darkBlue,
  textDecoration: "none",
  flex: 1,

  '&[data-imported="true"]': {
    color: colors.darkGray,
    textDecoration: "none",
  },
});

interface ResumeItemProps {
  resume: ResumeModel;
  onDelete: VoidFunction;
  matches: ReadonlyArray<Fuse.FuseResultMatch> | undefined;
}

export const ResumeItem: VoidFunctionComponent<ResumeItemProps> = ({
  resume,
  onDelete,
  matches,
}) => {
  const { id, isImport, isArchived } = resume;
  const { setIsDrawerOpen } = useAppState();

  return (
    <StyledListItem data-isarchived={isArchived}>
      <StyledLink
        data-imported={isImport}
        to={`/resume/${id}`}
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      >
        <Typography variant="subtitle1" typography={{ fontWeight: "bold" }}>
          {isArchived ? "(Archived) " : ""}
          {getDisplayName(resume)}
          {isImport && (
            <>
              &nbsp;
              <Tooltip title="is imported">
                <ReportProblemOutlinedIcon />
              </Tooltip>
            </>
          )}
        </Typography>
        <OverviewResumeSecondaryContent resume={resume} matches={matches} />
      </StyledLink>
      <StyledListItemSecondaryAction>
        <TooltipIconButton
          color="inherit"
          tooltip={"Delete resume"}
          edge="end"
          aria-label="delete"
          onClick={onDelete}
        >
          <DeleteIcon fontSize="small" />
        </TooltipIconButton>
      </StyledListItemSecondaryAction>
    </StyledListItem>
  );
};
