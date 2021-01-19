import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router-dom";

export const UserRedirect = ({ firebase, query, user }) => {
  const [val, isLoading, error] = useCollection(query);

  if (!val || isLoading || error) {
    return null;
  }

  const [data] = val.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return <Redirect to={`/live/${data.id}`} />;
};
