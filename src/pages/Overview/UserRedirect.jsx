import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router-dom";

export const UserRedirect = ({ firebase, query, user }) => {
  const [val, isLoading, error] = useCollection(query);

  if (!val || isLoading || error) {
    return null;
  }

  const [data] = val.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  // Send user without a resume to appropriate page
  let url = user && user.userRec && user.userRec.isManager ? "/creator" : "/live";

  if (data && data.id) url = `/live/${data.id}`;
  return <Redirect to={url} />;
};
