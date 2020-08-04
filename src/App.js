import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/dashboard";
import Login from "./components/login/login";
import SignUp from "./components/login/sign_up";
import PrivateRoute from "./components/tools/privateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <PrivateRoute component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
