import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "table-cell",
    verticalAlign: "middle",
    height: "60vh",
    width: "100vw",
    textAlign: "center",
  },
  typography: {
    display: "block",
    margin: "auto",
  },
}));

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.typography}>
        404
      </Typography>
      <Typography className={classes.typography}>
        Sorry! The Page You're Looking Was Not Found!
      </Typography>
    </div>
  );
}
