import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";

const FirebaseTest = () => {
  const { firebase } = React.useContext(FirebaseAppContext);
  const [val, loading, error] = useCollectionData(
    firebase.firestore().collection("resumes")
    // firebase.firestore().collection("resumes").where("name", "==", "Sebastiaan")
  );
  if (!loading && !error) console.log({ val });

  return (
    <>
      FireStoreData:
      <code>{val ? <pre>{JSON.stringify(val, null, 2)}</pre> : "nothing here"}</code>
    </>
  );
};

export default FirebaseTest;
