import React from "react";
import { Box, Flex, Text, Link, Button } from "rebass";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Nav = ({ profile }) => {
  const mockProps = { profile: { lastName: "Ter Ham", firstName: "Beau" } };
  const { firstName, lastName } = mockProps.profile;
  const history = useHistory();
  const goTo = (path) => history.push(path);

  return (
    <Flex p="0.5rem" color="white" bg="#12111d" alignItems="center">
      <Link variant="nav" href={"/overview"} fontSize="1.25rem">
        <Icon icon={faHome} />
        &nbsp;Overview
      </Link>
      <Box mx="auto" />
      <Text fontSize="1.25rem" pr="1rem">
        <Icon icon={faUserCircle} />
        &nbsp;
        {firstName}
        &nbsp;
        {lastName}
      </Text>
      <Button variant="outline" onClick={() => goTo("/")}>
        <Icon icon={faSignOutAlt} />
        Sign out
      </Button>
    </Flex>
  );
};

export default Nav;
