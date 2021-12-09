import { RouteComponentProps } from "react-router-dom";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { LoginLayout } from "../layouts/LoginLayout";
import { VoidFunctionComponent } from "react";

export const LoginPage: VoidFunctionComponent<RouteComponentProps> = () => {
  const { firebase, authProvider } = useFirebaseApp();
  const history = useHistory();

  const login = async () => {
    await firebase.auth().signInWithPopup(authProvider);
    history.push("/");
  };

  return (
    <LoginLayout>
      <Box width="100%" color="white" bgcolor="white" textAlign="center">
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
    </LoginLayout>
  );
};
