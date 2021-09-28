import { Drawer, Hidden, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { SpacedButton } from "../Material";
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

  const { userRecord } = useFirebaseApp();
  const [state, setState] = useState({
    left: false,
  });

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

  return <>{userRecord?.isManager ? renderDrawer() : props.children}</>;
};

export default OverviewDrawer;
