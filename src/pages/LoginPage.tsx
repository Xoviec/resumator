import { RouteComponentProps } from "react-router-dom";
import { useFirebaseApp } from "../context/FirebaseContext";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
