import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Avatar,
  Divider,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import "firebase/firestore";
import "firebase/auth";
import frontmenLogo from "../../assets/svg/frontmen-logo.svg";
import { useFirebaseApp } from "../../context/FirebaseContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
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

const Nav: React.FC = () => {
  const { firebase, authUser, userRecord } = useFirebaseApp();

  const history = useHistory();
  const goTo = (path: string) => history.push(path);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);

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

  const avatarComponent = authUser?.photoURL ? (
    <Avatar alt={authUser.displayName || "User Avatar"} src={authUser.photoURL} />
  ) : (
    <AccountCircle />
  );

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <a href="/" title="Home">
              <img className={classes.logo} src={frontmenLogo} alt="logo" />
            </a>
            <div className={[classes.grow].join(" ")} />
            <div className={classes.grow} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {avatarComponent}
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      {renderMenu}
    </div>
  );
};

export default Nav;
