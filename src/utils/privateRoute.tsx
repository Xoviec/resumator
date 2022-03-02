import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { userRecord } = useFirebaseApp();

  return (
    <Route
      {...rest}
      render={() => {
        if (!children) return false;
        return userRecord ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export { PrivateRoute };
