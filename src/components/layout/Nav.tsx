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
import { styled } from "@mui/system";
import { useState, VoidFunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useAppState } from "../../context/AppStateContext/AppStateContext";
import LogoWhite from "../../assets/images/iO-logo-white.png";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

export const Nav: VoidFunctionComponent = () => {
  const { firebase, authUser, userRecord } = useFirebaseApp();
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();

  const navigate = useNavigate();

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
    navigate("/");
  };

  const adminMenuItems = userRecord?.isManager ? (
    <div>
      <MenuItem>
        <StyledLink to="/new">Add Resume</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/skills">Manage Skills</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/users">Manage Users</StyledLink>
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
      <MenuItem role="button" aria-label="sign out" onClick={signOut}>
        Sign out
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <Box>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label={isDrawerOpen ? "close drawer" : "open drawer"}
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 2, display: { lg: "none" } }}
            >
              {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <IconButton component={Link} to="/">
              <img src={LogoWhite} alt="iO Logo white" height={44} />
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
              {authUser?.photoURL && authUser?.displayName ? (
                <Avatar alt={authUser.displayName} src={authUser.photoURL} />
              ) : (
                <AccountCircle aria-label="user avatar" />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {renderMenu}
    </Box>
  );
};
