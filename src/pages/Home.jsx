import React from "react";
import { Button, Box, Heading, Text } from "rebass";
import { FirebaseAppContext } from "../context/FirebaseContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { firebase, provider } = React.useContext(FirebaseAppContext);
  const history = useHistory();
  const login = () => {
    console.log(
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((user) => {
          console.log({ user });
          history.push("/overview");
        })
    );
  };
  return (
    <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
      <Heading fontSize={7} color="secondary" mb="3">
        Frontmen Resumator
      </Heading>
      <Text fontSize={4} color="text" mb="4">
        Welcome to the Frontmen Resumator, a tool to generate Resumes
      </Text>
      <Button variant="primary" p="1rem" onClick={login}>
        Login with Frontmen account
      </Button>
    </Box>
  );
};

export default Home;
