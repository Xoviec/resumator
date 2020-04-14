import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ResumeCard } from "../components";

const userMock = {
  name: "Beau Ter Ham",
  dateOfBirth: new Date(),
  city: "Palet Town",
  avatar:
    "https://avatars1.githubusercontent.com/u/24491661?s=460&u=b50fa05a36e9c258c6b80dac0560440c6faa1316&v=4",
};

const overviewMock = [...Array(7).keys()].map(() => ({ ...userMock }));

const Home = () => {
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [filterText, updateFilterText] = useState("");

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

  const resumeList = filterText ? filteredResumes : overviewMock;

  return (
    <Box as="section" py={3} maxWidth="1600px" margin="0 auto">
      <Heading as="h1" fontSize="3rem" color="white" mb="2rem">
        Resumes
      </Heading>
      <Flex alignItems="center" mb="2rem">
        <Icon icon={faSearch} size="lg" color="white" />
        <Input
          ml="1rem"
          width={["100%", "595px"]}
          type="search"
          onChange={({ target }) => filterInputHandler(target.value)}
        />
      </Flex>
      <Flex textAlign="center" flexWrap="wrap" mx="-1rem">
        {resumeList.map(({ name, avatar, city }, i) => (
          <ResumeCard key={i} id={i} name={name} avatar={avatar} city={city} />
        ))}
        {filterText && resumeList.length === 0 && (
          <Text color="white">Nothing found, try another search</Text>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
