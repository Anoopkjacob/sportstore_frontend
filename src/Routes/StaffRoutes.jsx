import React from "react";
import { Route, Redirect } from "react-router-dom";


export const StaffRoute = ({
  component: Component,
  ...rest
}) => {
  return (
  
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("loginid")&& localStorage.getItem("role")==="staff") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
