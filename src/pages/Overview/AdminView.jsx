import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "@emotion/styled";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import tableIcons from "./constants/tableIcons";
import downloadResume from "../../lib/downloadResume";
import getAvatarDataUri from "../../lib/getAvatarDataUri";

const StyledButton = styled(Button)`
  float: right;
  margin-bottom: 30px;
`;

const useStyles = makeStyles(() => ({
  activeIcon: {
    marginBottom: -2,
    paddingRight: 5,
    fontSize: 14,
  },
  inlineList: {
    display: "inline",
  },
  miniAvatar: {
    height: 40,
  },
  skillList: {
    margin: 0,
    padding: 0,
  },
  emptyNotice: {
    fontSize: 12,
    fontStyle: "italic",
    opacity: 0.8,
  },
}));

const getColumns = (classes) => [
  {
    title: "",
    field: "avatar",
    width: "40px",
    render: function RenderAvatar(rowData) {
      return (
        <img
          alt="avatar"
          src={getAvatarDataUri(rowData.personalia.avatar)}
          className={classes.miniAvatar}
        />
      );
    },
  },
  {
    title: "Name",
    field: "personalia.lastName",
    render: (rowData) => {
      return `${rowData.isImport ? "* " : ""}
        ${rowData.personalia.firstName} ${rowData.personalia.lastName}`;
    },
  },
  { title: "City", field: "personalia.city" },
  {
    title: "Skills",
    field: "skills",
    render: function RenderSkills({ skills }) {
      if (!skills || skills.length === 0) {
        return (
          <span className={classes.emptyNotice}>
            No skills have been supplied yet
          </span>
        );
      }

      const skillList = skills.map(({ id, name }, i) => (
        <li className={classes.inlineList} key={`${id}-${i}`}>
          {(i ? ", " : "") + name}
        </li>
      ));
      return <ul className={classes.skillList}>{skillList}</ul>;
    },
  },
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

export const AdminView = ({ firebase, query, searchTerms, user }) => {
  const [val, isLoading, error] = useCollection(query);
  const [resumeOverviewData, setResumeOverviewData] = React.useState([]);
  const history = useHistory();
  const classes = useStyles();
  const hasFetchError = !isLoading && error;
  const normalizedSearchTerms = searchTerms.map((s) => s.toLowerCase().trim());
  const resumes = React.useMemo(
    () => (val ? val.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : []),
    [val]
  );

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
    <Grid container>
      <Grid item xs={12}>
        <StyledButton href="/creator" variant="contained" color="primary">
          Add Resume
        </StyledButton>
      </Grid>

      {hasFetchError && (
        <Grid item xs={12}>
          Could not fetch resume data. If this problem persists, notify application
          maintainer
        </Grid>
      )}

      {!!resumeOverviewData.length && (
        <Grid item xs={12}>
          <MaterialTable
            options={{
              search: false,
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [10, 15, 25, 50],
            }}
            icons={tableIcons}
            columns={getColumns(classes)}
            data={resumeOverviewData}
            title="Resumes Overview"
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit resume",
                onClick: (event, rowData) => history.push(`./live/${rowData.id}`),
              },
              {
                icon: tableIcons.GetAppIcon,
                tooltip: "Download PFD",
                onClick: (event, rowData) => downloadResume(rowData),
              },
            ]}
            localization={{
              header: {
                actions: "",
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};
