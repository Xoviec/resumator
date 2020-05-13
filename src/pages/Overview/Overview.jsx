import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import tableIcons from "./constants/tableIcons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inlineList: {
    display: "inline",
  },
  skillList: {
    margin: 0,
    padding: 0,
  },
}));

const Home = ({ searchText }) => {
  const classes = useStyles();
  const { firebase } = useContext(FirebaseAppContext);
  const [val, loading, error] = useCollection(
    firebase.firestore().collection("resumes")
  );

  // id key isn't in the data by default, so merging it like this
  let data = val && val.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const readyToRender = !loading && !error;

  const history = useHistory();
  const goTo = (path) => history.push(path);

  const filterInputHandler = (value) => {
    const newfilterText = value.toLowerCase().trim();
    data = data.filter(
      (r) =>
        Object.values(r.personalia).some((v) =>
          v.toString().toLowerCase().trim().includes(newfilterText)
        ) ||
        Object.values(r.skills).some((v) =>
          v.name.toString().toLowerCase().trim().includes(newfilterText)
        )
    );
  };

  if (searchText && data && readyToRender) {
    filterInputHandler(searchText);
  }

  // Todo: make notification
  if (error) {
    console.error(error);
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      {readyToRender && data && (
        <MaterialTable
          options={{
            search: false,
            actionsColumnIndex: -1,
            pageSize: 10,
            pageSizeOptions: [10, 15, 25, 50],
          }}
          icons={tableIcons}
          columns={[
            {
              title: "",
              field: "avatar",
              render: (rowData) => (
                <img
                  alt={"avatar"}
                  src={rowData.avatar}
                  style={{ width: 40, borderRadius: "50%" }}
                />
              ),
            },
            {
              title: "Name",
              field: "personalia.lastName",
              render: (rowData) => {
                return `${rowData.personalia.firstName} ${rowData.personalia.lastName}`;
              },
            },
            { title: "City", field: "personalia.city" },
            {
              title: "Skills",
              field: "skills",
              render: (rowData) => {
                const skills = rowData.skills.map(({ id, name }, i) => (
                  <li className={classes.inlineList} key={id + i}>
                    {(i ? ", " : "") + name}
                  </li>
                ));
                return <ul className={classes.skillList}>{skills}</ul>;
              },
            },
            {
              title: "Status",
              field: "active",
              render: (rowData) => {
                return rowData.active ? (
                  <span>
                    <FiberManualRecordIcon style={{ fontSize: 12 }} />
                    Active
                  </span>
                ) : (
                  <span style={{ color: "gray" }}>
                    <FiberManualRecordIcon
                      color="disabled"
                      style={{ fontSize: 12 }}
                    />
                    Inactive
                  </span>
                );
              },
            },
          ]}
          data={data}
          title="Resumes Overview"
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: "edit User",
              onClick: (event, rowData) => goTo(`./creator/${rowData.id}`),
            },
            {
              icon: tableIcons.GetAppIcon,
              tooltip: "download resume",
              onClick: (event, rowData) => goTo(`./creator/${rowData.id}`),
            },
          ]}
          localization={{
            header: {
              actions: "",
            },
          }}
        />
      )}
    </div>
  );
};

export default Home;
