import { useCallback, useState, FunctionComponent, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";
import { styled } from "@mui/system";

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
  const [searchTerms, setSearchTerms] = useState("");
  const [tab, setTab] = useState("active-users-tab");

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
          <OverviewSearch onSearchChange={handleSearch} />
        </Sticky>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="User overview tabs">
              <Tab
                data-testid="tab-1"
                label="Active Users"
                value="active-users-tab"
              />
              <Tab
                data-testid="tab-2"
                label="Archived Users"
                value="archived-users-tab"
              />
            </TabList>
          </Box>
        </Box>
        <OverviewList searchTerms={searchTerms} />
      </DrawerContent>
    </TabContext>
  );
};
