import { readdirSync } from "fs";
import { extname, join as joinPath } from "path";

import * as firebase from "firebase/app";
import "firebase/firestore";

import importDocx from "./importDocx";

interface Options {
  mode?: "import",
  dir?: string, 
}
const MODES = [ "import" ];
const FLAGS = [ "dir"];
let options: Options = {};

const RESUME_COLLECTION = "resumes";
const db = initFirestore();

try {
  options = initOptions();
} catch(e) {
  console.error(e);
  process.exit(0); // Easily recoverable error, no need to be -1 about it
}

const directory = joinPath(process.cwd(), options.dir || "");
const promises = readdirSync(directory)
  .filter(file => extname(file) === '.docx' )
  .map(filename => joinPath(directory, filename))
  .map(s => {console.log(`Importing "${s}"`); return s})
  .map(importDocx)
  .map(resume => addToDB(RESUME_COLLECTION, resume))

Promise.all(promises)
  .then(results => {
    console.log(`Successfully imported ${results.length} resumes`);
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(-1);
  });

function initFirestore() {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    projectId:  process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
  });
  return firebase.firestore();  
}

function initOptions(): Options {
  const options: Options = process.argv.reduce((acc, arg) => ({
    ...acc,
    ...modeToOption(arg),
    ...flagToOption(arg),
  }), {});
  
  if (!options.dir) {
    throw new Error(      
      "Missing a directory to look for documents.\n" +
      "Try passing a directory:\n" +
      "  npm run import -- --dir=./"
    )
  }
  return options;
}
function modeToOption(arg: string) {
  return (MODES.indexOf(arg) !== -1 ) 
    ? { mode: arg } 
    : {}
}
function flagToOption(arg: string) {
  const option = FLAGS.map(flag => new RegExp(`--(${flag})=(.+)`))
    .map(regex => regex.exec(arg))
    .find(results => !!results)

  return (option && option.length === 3) 
    ? { [option[1]]: option[2] } 
    : {}
}

async function addToDB(collection: string, resumePromise: Promise<any>) {
  return db.collection(RESUME_COLLECTION).doc().set(await resumePromise);
}
