import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function SnackbarSuccess(props) {
  const { open } = props;
  return (
    <div>
      <Snackbar open={open} message={props.message} />
    </div>
  );
}
