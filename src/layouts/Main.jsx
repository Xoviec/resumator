import React from "react";
import { ThemeProvider } from "emotion-theming";
import { Box } from "rebass";
import { Nav } from "../components/layout";
import theme from "../config/theme";
import "../assets/css/global.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  spacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Nav />
      <main className={classes.content}>
        <div className={classes.spacer} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
