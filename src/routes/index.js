import React from "react";
import { Route, Switch } from "react-router";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </div>
);

export default routes;
