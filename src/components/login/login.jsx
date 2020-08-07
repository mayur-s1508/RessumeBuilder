import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import ForgetPassword from "./forget_password";

import { auth } from "firebase";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Copyright from "../tools/copyright";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
// import logo from "../../../assets/images/logo.png";
import EmailInput from "../inputs/email_input";
import PasswordInput from "../inputs/password_input";
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: "secondary",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignIn({ history }) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  // if login is in proogress
  const [isLoginProgress, setLoginProgress] = useState(false);
  // store
  // if user already lognied
  const [pending, setPending] = useState(true);

  // on init check if user already logined
  useEffect(() => {
    auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        history.push("/");
      } else {
        setPending(false);
      }
    });
  }, [history]);

  // on submit
  const loginUser = useCallback(
    (e) => {
      e.preventDefault();
      setLoginProgress(true);
      auth()
        .setPersistence(auth.Auth.Persistence.SESSION)
        .then(function () {
          return auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function (error) {
          var errorMessage = error.message;
          window.alert(errorMessage);
          setLoginProgress(false);
        });
      auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          history.push("/");
        }
      });
    },
    [history, email, password]
  );
  // first time
  if (pending) {
    return <CircularProgressIndicator display={pending} />;
  }
  return (
    <div>
      <CircularProgressIndicator display={isLoginProgress} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Resume Buddy
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form className={classes.form} onSubmit={loginUser}>
            <EmailInput setEmail={setEmail} size="medium" />
            <PasswordInput setPassword={setPassword} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit + " g-recaptcha"}
              disabled={isLoginProgress}
              // className="g-recaptcha"
              data-sitekey="6LeeKrsZAAAAANIWKQo8XWOu-0ETUBgxN43KJdvw"
              data-callback="onSubmit"
            >
              Sign In
            </Button>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ForgetPassword inProgress={isLoginProgress} />
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  href="#"
                  variant="body2"
                  color="primary"
                  component={RouterLink}
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </Typography>
            </div>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
