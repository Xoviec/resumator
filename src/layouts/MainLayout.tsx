import CssBaseline from "@mui/material/CssBaseline";
import makeStyles from "@mui/styles/makeStyles";
import { FunctionComponent } from "react";
import "../assets/css/global.css";
import { Nav } from "../components/layout/Nav";
import { colors } from "../config/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  spacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: theme.spacing(3),
  },
}));

export const MainLayout: FunctionComponent = ({ children }) => {
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
