import React, { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import { useDocument } from "react-firebase-hooks/firestore";

const UseResume = (id) => {
  const { firebase } = useContext(FirebaseAppContext);
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${id}`)
  );

  const [data, setData] = useState();

  useEffect(() => {
    if (value) {
      console.log(value.data());
      setData(value.data());
    }
  }, [value]);

  return [data, loading, error];
};

export default UseResume;
