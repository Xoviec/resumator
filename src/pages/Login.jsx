import React from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { firebase, provider } = React.useContext(FirebaseAppContext);
  const history = useHistory();

  const login = async () => {
    await firebase.auth().signInWithPopup(provider);
    history.push("/");
  };

  return (
    <Box width="100%" color="white" bg="white" textAlign="center">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="primary"
        style={{ fontSize: "40px" }}
      >
        Login
      </Typography>
      <Typography component="p" color="primary" paragraph>
        Login to use the CV creator tool
      </Typography>
      <Button variant="contained" color="secondary" onClick={login}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
