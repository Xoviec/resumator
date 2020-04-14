import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const FirebaseAppContext = React.createContext({
  firebase: {},
  initializing: true,
});

const FirebaseAppContextProvider = ({ children, config }) => {
  const [firebaseApp, setFirebaseApp] = React.useState({});
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    const app = firebase.initializeApp(config);
    setFirebaseApp(app.firebase_);
    setInitializing(false);
  }, [config]);

  if (initializing) return null;

  return (
    <FirebaseAppContext.Provider value={{ firebase: firebaseApp, initializing }}>
      {children}
    </FirebaseAppContext.Provider>
  );
};

export default FirebaseAppContextProvider;
