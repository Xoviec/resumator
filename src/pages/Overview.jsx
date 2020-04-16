import React, { useState, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../context/FirebaseContext";
import { Flex, Box, Heading, Text, Button } from "rebass";
import { Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { ResumeCard, Debug } from "../components";
import { useHistory } from "react-router-dom";

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
  const [val, loading, error] = useCollectionData(
    firebase.firestore().collection("resumes")
  );
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

  console.log({ val });

  return (
    <Box as="section" py={3} maxWidth="1600px" margin="0 auto">
      <Debug val={val} loading={loading} errlr={error} />
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
          {val.map(
            ({ id, avatar, personalia: { firstName, lastName, city } }, i) => (
              <ResumeCard
                key={i}
                //TODO: fixme, get id from the fireStore
                id={id || i}
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
  );
};

export default Home;
