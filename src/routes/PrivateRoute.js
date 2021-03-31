import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context as _authProviderContext } from "../contexts/AuthProvider/AuthProvider";

export default function PrivateRoute({ component: Component, ...rest }) {
  const authProviderContext = useContext(_authProviderContext);

  console.log("Context USER:", authProviderContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return authProviderContext.state.init ? (
          authProviderContext.state.user ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <></>
        );
      }}
    ></Route>
  );
}
