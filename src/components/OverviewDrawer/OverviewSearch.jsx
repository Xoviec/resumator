import React from "react";
import { Search } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fade, makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { skillsConstants } from "../../config/skills.constants";

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    paddingLeft: 50,
    width: "100%",
  },
  iconList: {
    padding: 0,
  },
  inputInput: {
    color: theme.palette.common.black,
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    // Autocomplete additions
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    textOverflow: "ellipsis",
  },
  listItem: {
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navContainer: {
    display: "flex",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid",
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export const OverviewSearch = ({ handleSearch }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <Autocomplete
        id="overview-searcher"
        multiple
        limitTags={3}
        options={skillsConstants}
        getOptionLabel={(option) => option}
        freeSolo
        onChange={(data, newValue) => {
          handleSearch(newValue);
        }}
        className={classes.autocomplete}
        renderInput={(params) => (
          <>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <TextField
              {...params}
              ref={params.InputProps.ref}
              placeholder="Search…"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              inputProps={{
                ...params.inputProps,
                "aria-label": "search",
                className: classes.inputInput,
              }}
            />
          </>
        )}
      />
    </div>
  );
};
