import { useCallback, useMemo, useState, VoidFunctionComponent } from "react";
import { Search } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { debounce } from "debounce";
import { styled } from "@mui/system";

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  paddingLeft: 50,
  border: "1px solid",
}));

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const StyledSearchIcon = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  left: 0,
}));

interface OverviewSearchProps {
  onSearchChange: (searchTerms: string) => void;
}

export const OverviewSearch: VoidFunctionComponent<OverviewSearchProps> = ({
  onSearchChange,
}) => {
  const [searchVal, setSearchVal] = useState("");

  const debouncedSearch = useMemo(() => {
    return debounce((searchValue: string) => {
      onSearchChange(searchValue);
    }, 500);
  }, [onSearchChange]);

  const doSearch = useCallback(
    (event) => {
      setSearchVal(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  return (
    <StyledSearch>
      <StyledSearchIcon>
        <Search />
      </StyledSearchIcon>
      <StyledInput onChange={doSearch} value={searchVal} placeholder="Search…" />
    </StyledSearch>
  );
};
