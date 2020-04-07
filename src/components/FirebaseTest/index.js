import React from "react";

import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";

const FirebaseTest = () => {
  const [val, loading, error] = useCollectionData(
    firebase.firestore().collection("resumes")
    // firebase.firestore().collection("resumes").where("name", "==", "Sebastiaan")
  );
  if (!loading && !error) console.log(val);

  return <>Nothing here</>;
};

export default FirebaseTest;
