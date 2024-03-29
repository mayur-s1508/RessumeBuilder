import React from "react";

import TextField from "@material-ui/core/TextField";

export default function EmailInput(props) {
  const { setEmail, variant, size, value } = props;

  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  return (
    <TextField
      variant={variant !== undefined ? variant : "outlined"}
      required
      fullWidth
      id="email"
      value={value}
      size={size ? size : "small"}
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      error={emailError}
      helperText={emailErrorMessage}
      onChange={(e) => {
        if (
          !e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
          )
        ) {
          setEmailError(true);
          setEmailErrorMessage("Invalid Email Address!!");
          setEmail(e.target.value);
        } else {
          setEmailError(false);
          setEmailErrorMessage("");
          setEmail(e.target.value);
        }
      }}
    />
  );
}
