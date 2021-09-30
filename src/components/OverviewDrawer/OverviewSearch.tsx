import { useCallback, useMemo, useState, VoidFunctionComponent } from "react";
import { Search } from "@material-ui/icons";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import { debounce } from "debounce";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    paddingLeft: 50,
    border: "1px solid",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.1),
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
}));

interface OverviewSearchProps {
  handleSearch: (searchTerms: string) => void;
}

export const OverviewSearch: VoidFunctionComponent<OverviewSearchProps> = ({
  handleSearch,
}) => {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState("");

  const debouncedSearch = useMemo(() => {
    return debounce((searchValue: string) => {
      handleSearch(searchValue);
    }, 500);
  }, [handleSearch]);

  const doSearch = useCallback(
    (event) => {
      setSearchVal(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        className={classes.input}
        onChange={doSearch}
        value={searchVal}
        placeholder="Search…"
      />
    </div>
  );
};
