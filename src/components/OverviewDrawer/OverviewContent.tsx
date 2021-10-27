import { useState, VoidFunctionComponent } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";
import makeStyles from "@mui/styles/makeStyles";

// context
import { useFirebaseApp } from "../../context/FirebaseContext";

// components
import { OverviewList } from "./OverviewList";
import { OverviewSearch } from "./OverviewSearch";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  drawerContent: {
    padding: "0 20px 0",
  },
  sticky: {
    padding: "10px 0 10px",
    position: "sticky",
    top: 0,
    left: 0,
    background: "white",
    zIndex: 2,
    borderBottom: "1px solid",
    marginBottom: "10px",
  },
}));

export const OverviewContent: VoidFunctionComponent = () => {
  const { firebase, userRecord } = useFirebaseApp();
  const classes = useStyles();
  const [searchTerms, setSearchTerms] = useState("");
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleSearch = (val = "") => {
    setSearchTerms(val);
  };

  return (
    <TabContext value={value}>
      <div className={classes.drawerContent}>
        <div className={classes.sticky}>
          <OverviewSearch handleSearch={handleSearch} />
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Active Users" value="1" />
              <Tab label="Archived Users" value="2" />
            </TabList>
          </Box>
        </Box>
        <OverviewList
          firebase={firebase}
          userRecord={userRecord}
          searchTerms={searchTerms}
          query={firebase.firestore().collection("resumes")}
        />
      </div>
    </TabContext>
  );
};
