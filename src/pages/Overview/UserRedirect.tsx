import { VoidFunctionComponent } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router-dom";
import {
  FirebaseAppContextType,
  FirestoreQuery,
} from "../../context/FirebaseContext";

interface UserRedirectProps {
  query: FirestoreQuery;
  userRecord: FirebaseAppContextType["userRecord"];
}

export const UserRedirect: VoidFunctionComponent<UserRedirectProps> = ({
  query,
  userRecord,
}) => {
  const [val, isLoading, error] = useCollection(query);

  if (!val || isLoading || error) {
    return null;
  }

  const [data] = val.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

  // Send user without a resume to appropriate page
  let url;

  if (data && data.id) url = `/resume/${data.id}`;
  url = userRecord?.isManager ? "/" : url || "/";
  return <Redirect to={url} />;
};
