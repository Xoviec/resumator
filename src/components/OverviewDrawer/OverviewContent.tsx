import { useCallback, useState, FunctionComponent, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";
import { styled } from "@mui/system";

// context
import { useFirebaseApp } from "../../context/FirebaseContext";

// components
import { OverviewList } from "./OverviewList";
import { OverviewSearch } from "./OverviewSearch";

const DrawerContent = styled("div")(({ theme }) => ({
  padding: "0 20px 0",
}));

const Sticky = styled("div")(({ theme }) => ({
  padding: "10px 0 10px",
  position: "sticky",
  top: "64px",
  left: 0,
  background: "white",
  zIndex: 2,
  borderBottom: "1px solid",
  marginBottom: "10px",
}));

export const OverviewContent: FunctionComponent = () => {
  const { firebase, userRecord } = useFirebaseApp();
  const [searchTerms, setSearchTerms] = useState("");
  const [tab, setTab] = useState("1");

  const handleChangeTab = useCallback((event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchTerms(value);
  }, []);

  return (
    <TabContext value={tab}>
      <DrawerContent>
        <Sticky>
          <OverviewSearch handleSearch={handleSearch} />
        </Sticky>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
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
      </DrawerContent>
    </TabContext>
  );
};
