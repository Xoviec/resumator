import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import "firebase/auth";
import "firebase/firestore";
import { useState, VoidFunctionComponent } from "react";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useFirebaseApp } from "../../context/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import { FrontmenLogoIcon } from "./FrontmenLogoIcon";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  linkItem: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

export const Nav: VoidFunctionComponent = () => {
  const { firebase, authUser, userRecord } = useFirebaseApp();
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();

  const history = useHistory();
  const goTo = (path: string) => history.push(path);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((isOpen) => !isOpen);
  };

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    goTo("/");
  };

  const adminMenuItems = userRecord?.isManager ? (
    <div>
      <MenuItem>
        <Link to="/new" className={classes.linkItem}>
          Add Resume
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/skills" className={classes.linkItem}>
          Manage Skills
        </Link>
      </MenuItem>
      <Divider />
    </div>
  ) : null;

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {adminMenuItems}
      <MenuItem onClick={signOut}>Sign out</MenuItem>
    </Menu>
  );

  return (
    <Box>
      <Box>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 2, display: { lg: "none" } }}
            >
              {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <IconButton component={Link} to="/">
              <FrontmenLogoIcon />
            </IconButton>

            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1, marginLeft: 2 }}
            >
              Resumator
            </Typography>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {authUser?.photoURL ? (
                <Avatar
                  alt={authUser.displayName || "User Avatar"}
                  src={authUser.photoURL}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {renderMenu}
    </Box>
  );
};

export default Nav;