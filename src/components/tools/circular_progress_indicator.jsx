import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "rgba(255,255,255,0.5)",
    zIndex: 100000001,
    margin: "auto",
    textAlign: "center",
  },
  indicator: {
    margin: "auto",
  },
}));

export default function CircularProgressIndicator(props) {
  const classes = useStyles();
  const { display } = props;
  return (
    <div
      className={classes.root}
      style={{ display: display ? "flex" : "none" }}
    >
      <CircularProgress
        size={40}
        top={10}
        status={"loading"}
        className={classes.indicator}
      />
    </div>
  );
}
