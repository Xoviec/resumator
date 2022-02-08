import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { userRecord } = useFirebaseApp();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!Component) return false;
        return userRecord ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export { PrivateRoute };
