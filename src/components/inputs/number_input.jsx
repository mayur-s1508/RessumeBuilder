import React from "react";

import TextField from "@material-ui/core/TextField";

export default function NumberInput(props) {
  const { setvalue, label, size, value } = props;
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <TextField
      required
      variant="outlined"
      label={label}
      value={value}
      size={size ? size : "small"}
      error={error}
      helperText={errorMessage}
      onChange={(e) => {
        if (e.target.value.match(/^\d*(\.\d+)?$/gm)) {
          setvalue(e.target.value);
          setError(false);
          setErrorMessage("");
        } else {
          setvalue("");
          setError(true);
          setErrorMessage("Please enter valid value");
        }
      }}
      fullWidth
    />
  );
}
