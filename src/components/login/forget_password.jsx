import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";
import CircularProgressIndicator from "../tools/circular_progress_indicator";

import { auth } from "firebase";
import SnackbarSuccess from "../tools/snackbar_success";
import EmailInput from "../inputs/email_input";

const useStyles = makeStyles((theme) => ({
  disabledLink: {
    pointerEvents: "none",
    color: "rgba(0,0,0,0.58)",
  },
}));

export default function ForgetPassword(props) {
  const [open, setOpen] = React.useState(false);
  const { inProgress } = props;
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [snackbarState, setSnackbarState] = useState(false);
  const [formProgress, setFormProgress] = useState(false);
  const resetPassword = useCallback(
    (e) => {
      e.preventDefault();
      setFormProgress(true);
      auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          setFormProgress(false);
          setOpen(false);
          setSnackbarState(true);
          setInterval(() => {
            setSnackbarState(false);
          }, 6000);
        })
        .catch(function (error) {
          // An error happened.
          setFormProgress(false);
          var errorMessage = error.message;
          window.alert(errorMessage);
        });
    },
    [email]
  );

  return (
    <div>
      <Link
        href="#"
        variant="body2"
        color="primary"
        onClick={handleClickOpen}
        className={inProgress ? classes.disabledLink : ""}
      >
        Forgot password?
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CircularProgressIndicator display={formProgress} />
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address to get password reset link.
          </DialogContentText>
          <EmailInput setEmail={setEmail} variant="standard" margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button
            onClick={resetPassword}
            disabled={email === ""}
            color="primary"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarSuccess
        open={snackbarState}
        message="Sent password reset link on mail!"
      />
    </div>
  );
}
