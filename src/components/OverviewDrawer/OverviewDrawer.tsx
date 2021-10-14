import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { FunctionComponent } from "react";
import { Theme } from "../../config/theme";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { OverviewContent } from "./OverviewContent";

const drawerWidth = 380;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

export const OverviewDrawer: FunctionComponent = (props) => {
  const classes = useStyles();
  const isLgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));

  const { userRecord } = useFirebaseApp();
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const renderDrawer = () => {
    return (
      <>
        <div className={classes.root}>
          <Drawer
            variant={isLgUp ? "permanent" : "temporary"}
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
            }}
          >
            <DrawerHeader />
            <Divider />
            <OverviewContent />
          </Drawer>
          <div className={classes.content}>{props.children}</div>
        </div>
      </>
    );
  };

  return <>{userRecord?.isManager ? renderDrawer() : props.children}</>;
};
