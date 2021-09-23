import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import initialData from "../config/initialData";
import { useFirebaseApp } from "../context/FirebaseContext";
import { castDatesInObject } from "../lib/date";

const useResume = (id) => {
  const { firebase } = useFirebaseApp();
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${id}`)
  );

  const [data, setData] = useState();

  useEffect(() => {
    if (value) {
      setData({ ...initialData, ...castDatesInObject(value.data()) });
    }
  }, [value]);

  return [data, loading, error];
};

export default useResume;
