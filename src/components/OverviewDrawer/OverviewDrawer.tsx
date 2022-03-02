import { Divider, Drawer, Theme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
// context
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
// components
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

const DrawerRoot = styled("div")(({ theme }) => ({
  display: "flex",
}));

const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  "@media (max-width: 600px)": {
    padding: theme.spacing(1),
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

export const OverviewDrawer: FunctionComponent = ({ children }) => {
  const isLgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const { userRecord } = useFirebaseApp();
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const renderDrawer = () => {
    return (
      <>
        <DrawerRoot>
          <StyledDrawer
            variant={isLgUp ? "permanent" : "temporary"}
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
          >
            <DrawerHeader />
            <Divider />
            <OverviewContent />
          </StyledDrawer>
          <Content>{children}</Content>
        </DrawerRoot>
      </>
    );
  };

  return <>{userRecord?.isManager ? renderDrawer() : children}</>;
};
