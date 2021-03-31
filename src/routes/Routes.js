import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import GameLobby from "../components/GameLobby";
import Login from "../components/Login/Login";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={GameLobby} />
      </Switch>
    </Router>
  );
}
