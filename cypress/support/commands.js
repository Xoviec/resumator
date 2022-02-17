import firebase from "firebase/compat/app";
import admin from "firebase-admin";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";
import serviceAccount from "../../serviceAccount.json";
import "@testing-library/cypress/add-commands";

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
