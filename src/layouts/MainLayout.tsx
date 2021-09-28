import { FunctionComponent } from "react";
import { Nav } from "../components/layout/Nav";
import "../assets/css/global.css";
import theme, { colors } from "../config/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

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
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Nav />
        <main className={classes.content}>
          <div className={classes.spacer} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};
