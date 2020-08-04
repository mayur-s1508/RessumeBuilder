import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "firebase";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import logo from "../../images/logo.jpg";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

import Copyright from "../tools/copyright";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
import EmailInput from "../inputs/email_input";
import PasswordInput from "../inputs/password_input";
import ConfirmPasswordInput from "../inputs/confirm_password_input";

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

export const SupplierSignup = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [isLoginProgress, setIsLoginProgress] = React.useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = React.useCallback(
    (e) => {
      e.preventDefault();
      setIsLoginProgress(true);
      auth()
        .createUserWithEmailAndPassword(email, confirmPassword)
        .then(function (result) {
          console.log(result);
          setIsLoginProgress(false);
          props.history.replace("/login");
        })
        .catch(function (error) {
          var errorMessage = error.message;
          window.alert(errorMessage);
          setIsLoginProgress(false);
        });
    },
    [email, confirmPassword, props.history]
  );

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
            Sign Up
          </Typography>

          <form className={classes.form} onSubmit={signUp}>
            <EmailInput setEmail={setEmail} size="normal" />
            <PasswordInput setPassword={setPassword} size="normal" />
            <ConfirmPasswordInput
              setPassword={setConfirmPassword}
              password={password}
              size="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                isLoginProgress ||
                (!isLoginProgress && email === "") ||
                (!isLoginProgress && password === "") ||
                (!isLoginProgress && confirmPassword === "")
              }
            >
              Sign Up
            </Button>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body2">
                Already have an account?
                <Link
                  href="#"
                  variant="body2"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                >
                  Sign In
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
};

export default SupplierSignup;
