import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
function Copyright() {
  return (
    <>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ marginTop: "24px" }}
      >
        {"Copyright © "}
        Resume Buddy {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ marginTop: "0" }}
      >
        Design and Developed by{" "}
        <Link href="https://teckytrick.com/" color="inherit">
          Teckytrick
        </Link>
      </Typography>
    </>
  );
}

export default Copyright;
