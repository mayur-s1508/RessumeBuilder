import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/dashboard";
import Login from "./components/login/login";
import SignUp from "./components/login/sign_up";
import PrivateRoute from "./components/tools/privateRoute";
import { SnackbarProvider } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
function App() {
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)} size="medium">
          <Close fontSize="small" htmlColor="#fff" />
        </IconButton>
      )}
    >
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <PrivateRoute component={Dashboard} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
