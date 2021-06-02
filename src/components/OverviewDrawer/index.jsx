import React, { useContext, useState } from "react";
import { OverviewSearch } from "./OverviewSearch";
import { Drawer, makeStyles, Hidden, Button } from "@material-ui/core";
import { SpacedButton } from "../Material";
import { OverviewList } from "./OverviewList";
import { FirebaseAppContext } from "../../context/FirebaseContext";

const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    padding: "120px 20px 0",
  },
  drawerMobile: {
    width: "50vw",
    flexShrink: 0,
    padding: "120px 20px 0",
  },
  drawerContentMobile: {
    padding: "120px 20px 0",
  },
  drawerContent: {
    padding: "120px 20px 0",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const OverviewDrawer = (props) => {
  const classes = useStyles();

  const { firebase, user } = useContext(FirebaseAppContext);
  const [state, setState] = React.useState({
    left: false,
  });
  const [isManager, setIsManager] = React.useState(false);
  const [searchTerms, setSearchTerms] = React.useState([]);

  const handleSearch = (val) => {
    setSearchTerms(val);
    // should pass the search upwards again, so I can pass searchTerms into component with React.clone in indexjsx of this module
  };

  React.useEffect(() => {
    if (
      user &&
      user.hasOwnProperty("userRec") &&
      user.userRec &&
      user.userRec.hasOwnProperty("isManager") &&
      user.userRec.isManager
    ) {
      setIsManager(true);
    }
  }, [user]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const renderDrawer = () => {
    // TODO: working list -> now mutates the clicked on person to whoever I am currently on
    // TODO: working !isManager view -> not sure how it behaves
    // TODO: correct navigation from home after login -> stuck on overview, should go to current user or /create
    // TODO: when saving on /create navigate to link/thatId
    // TODO: move those components into a component to avoid repeating them
    // TODO: checklist and delete all instead of individual delete OR hide/show delete button on hover
    // TODO: persist component on mobile when toggling - searchterms and data reset and re-requested
    return (
      <>
        <Hidden lgUp>
          <SpacedButton
            variant="contained"
            color="primary"
            onClick={toggleDrawer("left", true)}
          >
            Overview
          </SpacedButton>
        </Hidden>
        <div className={classes.root}>
          <Hidden mdDown>
            <Drawer
              variant="permanent"
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerContent}>
                <SpacedButton
                  href="/creator"
                  variant="contained"
                  color="primary"
                  marginBottom={2}
                >
                  Add Resume
                </SpacedButton>
                <OverviewSearch handleSearch={handleSearch} />
                <OverviewList
                  firebase={firebase}
                  user={user}
                  searchTerms={searchTerms}
                  query={firebase.firestore().collection("resumes")}
                />
              </div>
            </Drawer>
          </Hidden>
          <Hidden lgUp>
            <Drawer
              variant="temporary"
              anchor="left"
              className={classes.drawerMobile}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerContentMobile}>
                <SpacedButton
                  href="/creator"
                  variant="contained"
                  color="primary"
                  marginBottom={2}
                >
                  Add Resume
                </SpacedButton>
                <SpacedButton
                  onClick={toggleDrawer("left", false)}
                  variant="contained"
                  color="primary"
                  marginBottom={2}
                  marginLeft={2}
                >
                  Close
                </SpacedButton>
                <OverviewSearch handleSearch={handleSearch} />
                <OverviewList
                  firebase={firebase}
                  user={user}
                  searchTerms={searchTerms}
                  query={firebase.firestore().collection("resumes")}
                />
              </div>
            </Drawer>
          </Hidden>
          <div className={classes.content}>{props.children}</div>
        </div>
      </>
    );
  };

  return (
    <>
      {isManager && renderDrawer()}
      {!isManager && props.children}
    </>
  );
};

export default OverviewDrawer;
