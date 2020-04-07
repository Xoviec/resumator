import React from "react";
import { ThemeProvider } from "emotion-theming";
import "./assets/css/global.css";
import theme from "./config/theme";
import { Button, Flex, Box, Heading, Text } from "rebass";
import frontmenLogo from "./assets/svg/frontmen-logo.svg";
import FirebaseAppContextProvider from "./context/FirebaseContext";
import FirebaseTest from "./components/FirebaseTest";
// import useFirebase from "./hooks/useFirebase";

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
  REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
  REACT_APP_FIREBASE_PROJECT_ID: projectId,
  REACT_APP_FIREBASE_STPRAGE_BUCKET: storageBucket,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  REACT_APP_FIREBASE_APP_ID: appId,
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const App = () => {
  return (
    <FirebaseAppContextProvider config={firebaseConfig}>
      <ThemeProvider theme={theme}>
        <FirebaseTest />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="secondary"
        >
          <Box p="2rem">
            <img src={frontmenLogo} alt="logo" />
          </Box>
          <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
            <Heading fontSize={7} color="secondary" mb="3">
              Frontmen Resumator
            </Heading>
            <Text fontSize={4} color="text" mb="4">
              Welcome to the Frontmen Resumator, a tool to generate Resumes
            </Text>
            <Button variant="primary" p="1rem">
              Login with Frontmen account
            </Button>
          </Box>
        </Flex>
      </ThemeProvider>
    </FirebaseAppContextProvider>
  );
};

export default App;
