import React, { useState } from "react";
import { Nav } from "../components/layout";
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
  const [searchText, setSearchText] = useState("");
  const handleSearch = (val) => {
    setSearchText(val);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Nav handleSearch={handleSearch} />
      <main className={classes.content}>
        <div className={classes.spacer} />
        {React.cloneElement(children, { searchText })}
      </main>
    </div>
  );
};

export default MainLayout;
