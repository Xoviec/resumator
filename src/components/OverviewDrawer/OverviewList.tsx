import { useState, useMemo, VoidFunctionComponent } from "react";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { useCollection } from "react-firebase-hooks/firestore";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import { TooltipIconButton } from "../Material";
import Tooltip from "@material-ui/core/Tooltip";
import { colors } from "../../config/theme";
import { Confirmation } from "../Confirmation/Confirmation";
import {
  FirebaseAppContextType,
  FirestoreQuery,
} from "../../context/FirebaseContext";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import Fuse from "fuse.js";

export const useSectionItemHeaderStyles = makeStyles({
  actions: {
    opacity: 0,
    transition: "opacity 150ms ease-out",
    pointerEvents: "none",
    alignSelf: "start",
    flexShrink: 0,
  },
  container: {
    "&:hover $actions": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  isArchived: {
    opacity: 0.6,
  },
  link: {
    color: colors.darkBlue,
    textDecoration: "none",
  },
  isImported: {
    color: colors.darkGray,
    textDecoration: "none",
  },
  importedWarning: {
    verticalAlign: "middle",
    fontSize: "1.2rem",
  },
  activeLink: {
    color: colors.orange,
  },
});

interface OverviewListProps {
  firebase: FirebaseAppContextType["firebase"];
  query: FirestoreQuery;
  searchTerms: string;
  userRecord: FirebaseAppContextType["userRecord"];
}

export const OverviewList: VoidFunctionComponent<OverviewListProps> = ({
  firebase,
  query,
  searchTerms,
  userRecord,
}) => {
  const [resumeQueryResult, isLoading, error] = useCollection(query);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<ResumeModel | null>(null);
  const hasFetchError = !isLoading && error;

  const resumes: ResumeModel[] = useMemo(
    () =>
      resumeQueryResult
        ? resumeQueryResult.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        : [],
    [resumeQueryResult]
  );

  const resumeFuseModel = useMemo(
    () =>
      new Fuse(resumes, {
        keys: [
          "personalia.firstName",
          "personalia.lastName",
          "personalia.email",
          "personalia.city",
        ],
      }),
    [resumes]
  );

  const filteredResumes = useMemo(
    () =>
      searchTerms.length
        ? resumeFuseModel.search(searchTerms).map((r) => r.item)
        : resumes,
    [resumeFuseModel, resumes, searchTerms]
  );

  const classes = useSectionItemHeaderStyles();

  const deleteResume = () => {
    if (!resumeToDelete?.id) return;

    firebase
      .firestore()
      .collection("resumes")
      .doc(resumeToDelete.id)
      .delete()
      .then(() => setResumeToDelete(null))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error removing document: ", error);
      });
  };

  if (!userRecord?.isManager || !filteredResumes?.length) return null;

  return (
    <>
      {hasFetchError && (
        <span>
          Could not fetch resume data. If this problem persists, notify application
          maintainer
        </span>
      )}

      <List dense={true} data-testid="overview-list">
        {filteredResumes
          .filter((resume) => resume?.personalia)
          // move archived resumes to bottom of list
          .sort((docA: ResumeModel, docB: ResumeModel) =>
            docA.isArchived === docB.isArchived ? 0 : docA.isArchived ? 1 : -1
          )
          .map((resume) => {
            const { id, personalia, isImport, isArchived } = resume;
            const { firstName, lastName, avatar } = personalia;

            const name =
              firstName || lastName ? `${firstName} ${lastName}` : `No name - ${id}`;

            return (
              <ListItem
                key={id}
                classes={{
                  container: `${classes.container} ${
                    isArchived && classes.isArchived
                  }`,
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <img alt="avatar" width="15" src={getAvatarDataUri(avatar)} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <NavLink
                    className={isImport ? classes.isImported : classes.link}
                    activeClassName={classes.activeLink}
                    to={`/resume/${id}`}
                  >
                    {isArchived && "(Archived) "}
                    {name}
                    {isImport && (
                      <>
                        &nbsp;
                        <Tooltip title="is imported">
                          <ReportProblemOutlinedIcon
                            className={classes.importedWarning}
                          />
                        </Tooltip>
                      </>
                    )}
                  </NavLink>
                </ListItemText>
                <ListItemSecondaryAction className={classes.actions}>
                  <TooltipIconButton
                    color="inherit"
                    tooltip={"Delete resume"}
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setOpenConfirmation(true);
                      setResumeToDelete(resume);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </TooltipIconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>

      <Confirmation
        isOpen={openConfirmation}
        denyClick={() => setOpenConfirmation(false)}
        confirmClick={() => {
          setOpenConfirmation(false);
          deleteResume();
        }}
        title={"Delete item"}
        message={`Are you sure you want to delete this item?
            <br/>
            <strong>"${resumeToDelete?.personalia?.firstName} ${resumeToDelete?.personalia?.lastName} - ${resumeToDelete?.id}"</strong>
            <br/><br/>
            This action cannot be reversed.`}
      />
    </>
  );
};
