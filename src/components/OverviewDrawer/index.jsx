import React, { useContext } from "react";
import { Drawer, makeStyles, Hidden } from "@material-ui/core";
import { SpacedButton } from "../Material";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { OverviewContent } from "./OverviewContent";

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
    padding: "0 20px 0",
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerMobile: {
    width: "50vw",
    flexShrink: 0,
    padding: "0 20px 0",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const OverviewDrawer = (props) => {
  const classes = useStyles();

  const { user } = useContext(FirebaseAppContext);
  const [state, setState] = React.useState({
    left: false,
  });
  const [isManager, setIsManager] = React.useState(false);

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
              PaperProps={{ elevation: 2 }}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <OverviewContent toggleDrawer={toggleDrawer} />
            </Drawer>
          </Hidden>
          <Hidden lgUp>
            <Drawer
              variant="temporary"
              anchor="left"
              className={classes.drawerMobile}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              PaperProps={{ elevation: 2 }}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <OverviewContent toggleDrawer={toggleDrawer} isMobile={true} />
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
