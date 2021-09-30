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

function refreshResumeData(
  oldData: ResumeModel[],
  newData: ResumeModel[],
  setData: (resume: ResumeModel[]) => void
) {
  const data1 = JSON.stringify(oldData);
  const data2 = JSON.stringify(newData);
  if (data1 !== data2) {
    setData(newData);
  }
}

function twoWayFind(personaliaValue: string | undefined, searchTerm: string = "") {
  if (typeof personaliaValue !== 'string') return false;

  return searchTerm.includes(personaliaValue) || personaliaValue.includes(searchTerm);
}

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
  const [val, isLoading, error] = useCollection(query);
  const [resumeOverviewData, setResumeOverviewData] = useState<ResumeModel[]>([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<ResumeModel | null>(null);
  const hasFetchError = !isLoading && error;
  const normalizedSearchTerms = searchTerms.toLowerCase().trim();

  const resumes: ResumeModel[] = useMemo(
    () => (val ? val.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })) : []),
    [val]
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

  const renderResume = () => {
    if (!resumeOverviewData.length) return;
    return (
      <>
        <List dense={true} data-testid="overview-list">
          {resumeOverviewData
            .filter((resume) => resume.personalia && resume)
            .map((resume) => {
              const { id, personalia, isImport } = resume;
              const { firstName, lastName, avatar } = personalia;

              const name =
                firstName || lastName
                  ? `${firstName} ${lastName}`
                  : `No name - ${id}`;

              return (
                <ListItem key={id} classes={{ container: classes.container }}>
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

  if (!searchTerms.length && resumes.length) {
    refreshResumeData(resumeOverviewData, resumes, setResumeOverviewData);
  }

  if (searchTerms.length) {
    const filteredResumes = resumes.filter(({ personalia }) => {
      // TODO: why not just search by firstName + lastName, why all this trouble ?
      if (personalia) {
        const personaliaValues = Object.values(personalia);
        const isInPersonalia = personaliaValues.some((value) => {
          const hasValue = twoWayFind(value, normalizedSearchTerms);
          return hasValue;
        });
        if (isInPersonalia) return true;
      }

      return false;
    });
    refreshResumeData(resumeOverviewData, filteredResumes, setResumeOverviewData);
  }

  if (!userRecord?.isManager || !val) return null;

  return (
    <>
      {hasFetchError && (
        <span>
          Could not fetch resume data. If this problem persists, notify application
          maintainer
        </span>
      )}

      {renderResume()}
    </>
  );
};
