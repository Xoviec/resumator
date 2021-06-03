import React, { useContext } from "react";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { AdminView } from "./AdminView";
import { UserRedirect } from "./UserRedirect";

const Home = ({ searchTerms }) => {
  console.log("vlad index initial redirect on home");
  const { firebase, user } = useContext(FirebaseAppContext);

  if (user) {
    if (user.userRec.isManager) {
      return (
        <AdminView
          firebase={firebase}
          user={user}
          searchTerms={searchTerms}
          query={firebase.firestore().collection("resumes")}
        />
      );
    }
    return (
      <UserRedirect
        firebase={firebase}
        user={user}
        query={firebase
          .firestore()
          .collection("resumes")
          .where("personalia.email", "==", user.email)}
      />
    );
  }
  return null;
};

export default Home;
