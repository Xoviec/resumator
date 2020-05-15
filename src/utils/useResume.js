import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import { useDocument } from "react-firebase-hooks/firestore";

const useResume = (id) => {
  const { firebase } = useContext(FirebaseAppContext);
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${id}`)
  );

  const [data, setData] = useState();

  useEffect(() => {
    if (value) {
      setData(value.data());
    }
  }, [value]);

  return [data, loading, error];
};

export default useResume;
