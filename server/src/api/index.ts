import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import dotenv from "dotenv";
import { ParsedQs } from "../types";
dotenv.config();

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

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

// TODO convert to async
export const getResume = (uid: string | string[] | ParsedQs | ParsedQs[]) => {
  const id = uid.toString();
  const resumeRef = firestore.collection("resumes").doc(id);
  const getDoc = resumeRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        return doc.data();
      }
    })
    .catch((err) => {
      console.log("Error getting document", err);
    });

  return getDoc;
};
