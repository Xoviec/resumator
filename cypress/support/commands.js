import firebase from "firebase/app";
import admin from "firebase-admin";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";
import serviceAccount from "../../serviceAccount.json";

const fbConfig = {
  apiKey: Cypress.env("apiKey"),
  authDomain: Cypress.env("authDomain"),
  databaseURL: Cypress.env("databaseURL"),
  projectId: Cypress.env("projectId"),
  storageBucket: Cypress.env("storageBucket"),
  messagingSenderId: Cypress.env("messagingSenderId"),

  credential: admin.credential.cert(serviceAccount),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
