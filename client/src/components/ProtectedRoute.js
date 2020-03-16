import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={routeProps => {
        // check for token, if there, return component
        // otherwise return to login page
        if (sessionStorage.getItem("token")) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
