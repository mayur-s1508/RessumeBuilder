import React from "react";

import TextField from "@material-ui/core/TextField";

export default function TextInput(props) {
  const { setValue, label, size, margin, value } = props;
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <TextField
      required
      variant="outlined"
      value={value}
      margin={margin ? margin : "small"}
      label={label}
      size={size ? size : "small"}
      error={error}
      helperText={errorMessage}
      {...props}
      onChange={(e) => {
        if (!e.target.value.match(/^[A-Z]*$/)) {
          setValue(e.target.value);
          setError(false);
          setErrorMessage("");
        } else {
          setValue(e.target.value);
          setError(true);
          setErrorMessage("This field should not empty!!!");
        }
      }}
      fullWidth
    />
  );
}
