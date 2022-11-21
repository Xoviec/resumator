import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";

export const RequireAuth = () => {
  const { isLoading, userRecord } = useFirebaseApp();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!userRecord) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};
