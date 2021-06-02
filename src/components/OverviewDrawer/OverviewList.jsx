import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { useCollection } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core/";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

const getColumns = (classes) => [
  {
    title: "",
    field: "avatar",
    cellStyle: {
      whiteSpace: "nowrap",
      width: "1%",
    },
    render: function RenderAvatar(rowData) {
      return (
        <img
          alt="avatar"
          src={getAvatarDataUri(rowData.personalia && rowData.personalia.avatar)}
          className={classes.miniAvatar}
        />
      );
    },
  },
  {
    title: "Name",
    field: "personalia.lastName",
    render: (rowData) => {
      const fullName = rowData.personalia
        ? `${rowData.personalia.firstName} ${rowData.personalia.lastName}`
        : "";
      return `${rowData.isImport ? "* " : ""} ${fullName}`;
    },
  },
  { title: "City", field: "personalia.city", width: 100 },
  {
    title: "Status",
    field: "active",
    type: "boolean",
    render: function RenderStatus(rowData) {
      return !rowData.isImport ? (
        <span>
          <FiberManualRecordIcon color="primary" className={classes.activeIcon} />
          Active
        </span>
      ) : (
        <span style={{ color: "gray" }}>
          <FiberManualRecordIcon color="disabled" className={classes.activeIcon} />
          Inactive
        </span>
      );
    },
  },
];

function refreshResumeData(oldData, newData, setData) {
  const data1 = JSON.stringify(oldData);
  const data2 = JSON.stringify(newData);
  if (data1 !== data2) {
    setData(newData);
  }
}

function twoWayFind(value, arr) {
  const isEmptyValue = !value;
  if (isEmptyValue) return false;

  const str = value.toString().toLowerCase().trim();
  const stringifiedArray = arr.join(" ").toLowerCase();

  const stringisInStringArray = stringifiedArray.includes(str);
  const stringiedArrayIsInString = str.includes(stringifiedArray);

  return stringisInStringArray || stringiedArrayIsInString;
}

export const OverviewList = ({ firebase, query, searchTerms, user }) => {
  const [val, isLoading, error] = useCollection(query);
  const [resumeOverviewData, setResumeOverviewData] = React.useState([]);
  const hasFetchError = !isLoading && error;
  const normalizedSearchTerms = searchTerms.map((s) => s.toLowerCase().trim());
  const history = useHistory();
  const resumes = React.useMemo(
    () => (val ? val.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : []),
    [val]
  );

  const deleteResume = (resume) => {
    if (resume && resume.id) {
      firebase
        .firestore()
        .collection("resumes")
        .doc(resume.id)
        .delete()
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };

  const renderResume = () => {
    if (!resumeOverviewData.length) return;
    return (
      <List dense={true}>
        {resumeOverviewData
          .filter((resume) => resume.personalia && resume)
          .map((resume) => {
            const { id, personalia } = resume;
            const { firstName, lastName } = personalia;

            let name =
              firstName || lastName ? `${firstName} ${lastName}` : `No name - ${id}`;

            return (
              <ListItem key={id}>
                <ListItemAvatar>
                  <Avatar>
                    <img
                      alt="avatar"
                      width="15"
                      src={getAvatarDataUri(personalia.avatar)}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  onClick={() => history.push(`./${id}`)}
                />
                <ListItemSecondaryAction onClick={() => deleteResume(resume)}>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              //   <li key={id}>
              //     <span onClick={() => history.push(`./live/${id}`)}>{name}</span>
              //   </li>
            );
          })}
      </List>
    );
  };

  if (!searchTerms.length && resumes.length) {
    refreshResumeData(resumeOverviewData, resumes, setResumeOverviewData);
  }

  if (searchTerms.length) {
    const filteredResumes = resumes.filter(({ personalia, skills }) => {
      if (personalia) {
        const personaliaValues = Object.values(personalia);
        const isInPersonalia = personaliaValues.some((value) => {
          const hasValue = twoWayFind(value, normalizedSearchTerms);
          return hasValue;
        });
        if (isInPersonalia) return true;
      }

      if (skills) {
        const skillsArray = Object.values(skills).map(({ name }) => name);
        const isInSkills = skillsArray.some((skill) => {
          const hasValue = twoWayFind(skill, normalizedSearchTerms);
          return hasValue;
        });
        if (isInSkills) return true;
      }
      return false;
    });
    refreshResumeData(resumeOverviewData, filteredResumes, setResumeOverviewData);
  }

  if (!user || !val) return null;

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
