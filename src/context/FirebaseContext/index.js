import React from "react";
import * as firebase from "firebase/app";

export const FirebaseAppContext = React.createContext({
  firebase: {},
  initializing: true,
});

const FirebaseAppContextProvider = ({ children, config }) => {
  const [firebaseApp, setFirebaseApp] = React.useState({});
  const [initializing, setInitializing] = React.useState(true);
  React.useEffect(() => {
    const app: any = firebase.initializeApp(config);
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
