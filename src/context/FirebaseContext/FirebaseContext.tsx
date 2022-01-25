import { useState, useContext, useEffect } from "react";
import * as React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import getFirebaseConfig from "./getFirebaseConfig";

export type FirestoreQuery = firebase.firestore.Query;

export type FirebaseUserRecord = {
  email: string;
  name: string;
  registered: boolean;
  isManager: boolean;
  id?: string;
};

export type FirebaseAppContextType = {
  firebase: firebase.app.App;
  initializing: boolean;
  isLoading: boolean;
  authUser?: firebase.User;
  userRecord?: FirebaseUserRecord;
  authProvider: firebase.auth.AuthProvider;
};

const getFirebaseAuthProvider = (): firebase.auth.AuthProvider => {
  if (process.env.NODE_ENV === "development") {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "frontmen.nl",
    });

    return provider;
  } else {
    return new firebase.auth.SAMLAuthProvider("saml.intracto");
  }
};

const FirebaseAppContext = React.createContext<FirebaseAppContextType | undefined>(
  undefined
);

export const useFirebaseApp = (): FirebaseAppContextType => {
  const context = useContext(FirebaseAppContext);
  if (context === undefined) {
    throw new Error("Firebase context is used before initialization");
  }

  return context;
};

export const FirebaseAppContextProvider: React.FC = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState<firebase.app.App | undefined>(
    undefined
  );
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [authUserState, setAuthUserState] = useState<firebase.User | undefined>(
    undefined
  );
  const [userRecord, setUserRecord] = useState<FirebaseUserRecord | undefined>(
    undefined
  );

  useEffect(() => {
    const initApp = async () => {
      if (firebase.apps.length) {
        const app = firebase.apps[0];
        setFirebaseApp(app);
      } else {
        const config = await getFirebaseConfig();
        const app = firebase.initializeApp(config);
        setFirebaseApp(app);
      }

      setIsInitializing(false);
    };

    initApp();
  }, []);

  useEffect(() => {
    if (!firebaseApp) {
      return;
    }

    // This function returns an unsubscribe function, so returning it directly makes sense
    return firebase.auth().onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        setUserRecord(undefined);
        setAuthUserState(undefined);
        setIsLoading(false);
        return;
      }

      // get the corresponding user record from the database
      // before setting the user object to the context
      // because we gonna need to know if it's a manager or not
      const userRec = await firebase
        .firestore()
        .collection("users")
        .doc(authUser.uid)
        .get();

      if (userRec) {
        setUserRecord(userRec.data() as FirebaseUserRecord);
      } else {
        setUserRecord(undefined);
      }

      setAuthUserState(authUser);
      setIsLoading(false);
    });
  }, [firebaseApp]);

  if (isInitializing || !firebaseApp) return null;

  const authProvider = getFirebaseAuthProvider();

  return (
    <FirebaseAppContext.Provider
      value={{
        firebase: firebaseApp,
        initializing: isInitializing,
        isLoading,
        authUser: authUserState,
        userRecord,
        authProvider,
      }}
    >
      {children}
    </FirebaseAppContext.Provider>
  );
};
