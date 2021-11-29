import { useState, useMemo, VoidFunctionComponent } from "react";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { useCollection } from "react-firebase-hooks/firestore";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material/";
import { TabPanel } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Tooltip from "@mui/material/Tooltip";
import Fuse from "fuse.js";
import clsx from "clsx";

// configs
import { colors } from "../../config/theme";

// context
import {
  FirebaseAppContextType,
  FirestoreQuery,
} from "../../context/FirebaseContext";

// components
import { TooltipIconButton } from "../Material";
import { Confirmation } from "../Confirmation/Confirmation";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";

const PREFIX = "OverviewList";

const classes = {
  actions: `${PREFIX}-actions`,
  container: `${PREFIX}-container`,
  isArchived: `${PREFIX}-isArchived`,
  link: `${PREFIX}-link`,
  isImported: `${PREFIX}-isImported`,
  importedWarning: `${PREFIX}-importedWarning`,
  activeLink: `${PREFIX}-activeLink`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.actions}`]: {
    opacity: 0,
    transition: "opacity 150ms ease-out",
    pointerEvents: "none",
    alignSelf: "start",
    flexShrink: 0,
  },
  [`& .${classes.container}`]: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: colors.darkGrayOpacity,
    },
    [`&:hover .${classes.actions}`]: {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  [`& .${classes.isArchived}`]: {
    opacity: 0.6,
  },
  [`& .${classes.link}`]: {
    color: colors.darkBlue,
    textDecoration: "none",
  },
  [`& .${classes.isImported}`]: {
    color: colors.darkGray,
    textDecoration: "none",
  },
  [`& .${classes.importedWarning}`]: {
    verticalAlign: "middle",
    fontSize: "1.2rem",
  },
  [`& .${classes.activeLink}`]: {
    color: colors.orange,
  },
}));

interface OverviewListProps {
  firebase: FirebaseAppContextType["firebase"];
  query: FirestoreQuery;
  searchTerms: string;
  userRecord: FirebaseAppContextType["userRecord"];
}

interface ResumeModelWithDisplayName extends ResumeModel {
  displayName: string;
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
        threshold: 0,
        keys: ["personalia.firstName", "personalia.lastName"],
      }),
    [resumes]
  );

  const resumesToShow = useMemo(() => {
    const searchResult = searchTerms.length
      ? resumeFuseModel.search(searchTerms).map((r) => r.item)
      : resumes;

    const filteredResumes: ResumeModelWithDisplayName[] = searchResult
      .filter((resume) => resume?.personalia)
      .map((resume) => {
        const {
          id,
          personalia: { firstName, lastName },
        } = resume;

        const displayName =
          firstName || lastName ? `${firstName} ${lastName}` : `No name - ${id}`;

        return {
          ...resume,
          displayName,
        };
      });

    const sortByName = (
      a: ResumeModelWithDisplayName,
      b: ResumeModelWithDisplayName
    ) => {
      if (a.displayName < b.displayName) return -1;
      if (a.displayName > b.displayName) return 1;
      return 0;
    };

    const archivedResumes = filteredResumes
      .filter((resume) => resume.isArchived)
      .sort(sortByName);

    const unarchivedResumes = filteredResumes
      .filter((resume) => !resume.isArchived)
      .sort(sortByName);

    return {
      unarchivedResumes,
      archivedResumes,
    };
  }, [resumeFuseModel, resumes, searchTerms]);

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

  if (!userRecord?.isManager || !resumesToShow?.unarchivedResumes.length)
    return null;

  return (
    <Root>
      {hasFetchError && (
        <span>
          Could not fetch resume data. If this problem persists, notify application
          maintainer
        </span>
      )}
      <TabPanel value="1">
        <List dense={true} data-testid="overview-list">
          {resumesToShow?.unarchivedResumes.map((resume) => {
            const { id, displayName, personalia, isImport, isArchived } = resume;

            return (
              <NavLink
                key={id}
                className={clsx({
                  [classes.isImported]: isImport,
                  [classes.link]: !isImport,
                })}
                activeClassName={classes.activeLink}
                to={`/resume/${id}`}
              >
                <ListItem
                  classes={{
                    container: clsx(classes.container, {
                      [classes.isArchived]: isArchived,
                    }),
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        alt="avatar"
                        width="15"
                        src={getAvatarDataUri(personalia.avatar)}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    {displayName}
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
              </NavLink>
            );
          })}
        </List>
      </TabPanel>
      <TabPanel value="2">
        <List dense={true} data-testid="overview-list">
          {resumesToShow?.archivedResumes.map((resume) => {
            const { id, displayName, personalia, isImport, isArchived } = resume;

            return (
              <NavLink
                key={id}
                className={isImport ? classes.isImported : classes.link}
                activeClassName={classes.activeLink}
                to={`/resume/${id}`}
              >
                <ListItem
                  classes={{
                    container: `${classes.container} ${
                      isArchived && classes.isArchived
                    }`,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        alt="avatar"
                        width="15"
                        src={getAvatarDataUri(personalia.avatar)}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    {isArchived && "(Archived) "}
                    {displayName}
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
              </NavLink>
            );
          })}
        </List>
      </TabPanel>
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
    </Root>
  );
};
