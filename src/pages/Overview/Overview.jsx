import React, { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { ResumeCard } from "../../components";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import tableIcons from "./constants/tableIcons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const userMock = {
  name: "Beau Ter Ham",
  dateOfBirth: new Date(),
  city: "Palet Town",
  avatar:
    "https://avatars1.githubusercontent.com/u/24491661?s=460&u=b50fa05a36e9c258c6b80dac0560440c6faa1316&v=4",
};

const overviewMock = [...Array(7).keys()].map(() => ({ ...userMock }));

const Home = () => {
  const { firebase } = useContext(FirebaseAppContext);
  const [val, loading, error] = useCollection(
    firebase.firestore().collection("resumes")
  );

  // id key isn't in the data by default, so merging it like this
  const data = val && val.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const [filteredResumes, setFilteredResumes] = useState([]);
  const [filterText, updateFilterText] = useState("");
  const resumeList = filterText ? filteredResumes : overviewMock;
  const readyToRender = !loading && !error;
  const history = useHistory();

  const goTo = (path) => history.push(path);

  const filterInputHandler = (value) => {
    const newfilterText = value.toLowerCase().trim();
    updateFilterText(newfilterText);
    const resumes = filterByText();
    setFilteredResumes(resumes);
  };

  const filterByText = () =>
    overviewMock.filter((r) =>
      Object.values(r).some((v) =>
        v.toString().toLowerCase().trim().includes(filterText)
      )
    );

  // Todo: make notification
  if (error) {
    console.error(error);
  }

  // Table row custom render
  const ConsoleLog = ({ children }) => {
    console.log(children);
    return false;
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      {readyToRender && data && <ConsoleLog>{data}</ConsoleLog>}
      {readyToRender && data && (
        <MaterialTable
          icons={tableIcons}
          columns={[
            {
              title: "",
              field: "avatar",
              render: (rowData) => (
                <img
                  alt={"avatar"}
                  src={rowData.avatar}
                  style={{ width: 40, borderRadius: "50%" }}
                />
              ),
            },
            { title: "First Name", field: "personalia.firstName" },
            { title: "Last Name", field: "personalia.lastName" },
            { title: "City", field: "personalia.city" },
            {
              title: "Skills",
              field: "skills",
              render: (rowData) =>
                rowData.skills.map(({ id, name }, i) => (
                  <li key={id + i}>{name}</li>
                )),
            },
            {
              title: "Status",
              field: "active",
              render: (rowData) => {
                return rowData.active ? (
                  <span>
                    <FiberManualRecordIcon style={{ fontSize: 12 }} />
                    Active
                  </span>
                ) : (
                  <span style={{ color: "gray" }}>
                    <FiberManualRecordIcon
                      color="disabled"
                      style={{ fontSize: 12 }}
                    />
                    Inactive
                  </span>
                );
              },
            },
          ]}
          data={data}
          title="Resumes Overview"
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: "edit User",
              onClick: (event, rowData) => goTo(`./creator/${rowData.id}`),
            },
          ]}
          localization={{
            header: {
              actions: "",
            },
          }}
        />
      )}

      <Box as="section" py={3} maxWidth="1600px" margin="0 auto">
        {/* <Debug val={val} loading={loading} error={error} /> */}
        <Heading as="h1" fontSize="3rem" color="white" mb="2rem">
          Resumes Overview
        </Heading>

        <Flex alignItems="center" mb="1rem">
          <Icon icon={faSearch} size="lg" color="white" />
          <Input
            ml="1rem"
            width={["100%", "595px"]}
            type="search"
            onChange={({ target }) => filterInputHandler(target.value)}
          />
        </Flex>
        <Button onClick={() => goTo("/creator")} mb="1rem">
          <Icon icon={faPlus} />
          &nbsp; New Resume
        </Button>

        {!readyToRender ? (
          <Flex justifyContent="center">
            <Icon icon={faSyncAlt} size="5x" spin color="white" />
          </Flex>
        ) : (
          <Flex textAlign="center" flexWrap="wrap" mx="-1rem">
            {data &&
              data.map(
                ({ id, avatar, personalia: { firstName, lastName, city } }, i) => (
                  <ResumeCard
                    key={i}
                    //TODO: fixme, get id from the fireStore
                    id={id}
                    name={`${firstName} ${lastName}`}
                    avatar={avatar}
                    city={city}
                  />
                )
              )}
            {filterText && resumeList.length === 0 && (
              <Text color="white">Nothing found, try another search</Text>
            )}
          </Flex>
        )}
      </Box>
    </div>
  );
};

export default Home;
