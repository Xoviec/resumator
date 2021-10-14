import makeStyles from "@mui/styles/makeStyles";
import { useState, VoidFunctionComponent } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { OverviewList } from "./OverviewList";
import { OverviewSearch } from "./OverviewSearch";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  drawerContent: {
    padding: "0 20px 0",
  },
  sticky: {
    padding: "10px 0 10px",
    position: "sticky",
    top: 0,
    left: 0,
    background: "white",
    zIndex: 2,
    borderBottom: "1px solid",
    marginBottom: "10px",
  },
}));

export const OverviewContent: VoidFunctionComponent = () => {
  const { firebase, userRecord } = useFirebaseApp();
  const [searchTerms, setSearchTerms] = useState("");
  const classes = useStyles();

  const handleSearch = (val = "") => {
    setSearchTerms(val);
  };

  return (
    <div className={classes.drawerContent}>
      <div className={classes.sticky}>
        <OverviewSearch handleSearch={handleSearch} />
      </div>
      <OverviewList
        firebase={firebase}
        userRecord={userRecord}
        searchTerms={searchTerms}
        query={firebase.firestore().collection("resumes")}
      />
    </div>
  );
};
