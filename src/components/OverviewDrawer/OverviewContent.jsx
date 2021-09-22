import React, { useContext } from "react";
import { OverviewSearch } from "./OverviewSearch";
import { SpacedButton } from "../Material";
import { OverviewList } from "./OverviewList";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { NavLink } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core/";

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
    padding: "80px 0 10px",
    position: "sticky",
    top: 0,
    left: 0,
    background: "white",
    zIndex: "2",
    borderBottom: "1px solid",
    marginBottom: "10px",
  },
}));

export const OverviewContent = ({ isMobile, toggleDrawer, ...props }) => {
  const { firebase, user } = useContext(FirebaseAppContext);
  const [searchTerms, setSearchTerms] = React.useState([]);
  const classes = useStyles();

  const handleSearch = (val = []) => {
    setSearchTerms(val);
  };

  return (
    <div className={classes.drawerContent}>
      <div className={classes.sticky}>
        {isMobile && (
          <SpacedButton
            onClick={toggleDrawer("left", false)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Close
          </SpacedButton>
        )}
        <OverviewSearch handleSearch={handleSearch} />
      </div>
      <OverviewList
        firebase={firebase}
        user={user}
        searchTerms={searchTerms}
        query={firebase.firestore().collection("resumes")}
      />
    </div>
  );
};
