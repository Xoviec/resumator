import React from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Home = () => {
  const { firebase, provider } = React.useContext(FirebaseAppContext);
  const history = useHistory();

  const login = async () => {
    const user = await firebase.auth().signInWithPopup(provider);
    console.log({ user });
    history.push("/overview");
  };

  return (
    <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom color={"primary"}>
        Frontmen Resumator
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom color={"secondary"}>
        Welcome to the Frontmen Resumator, a tool to generate Resumes
      </Typography>
      <Button variant="contained" color="secondary" onClick={login}>
        Login with Frontmen account
      </Button>
    </Box>
  );
};

export default Home;
