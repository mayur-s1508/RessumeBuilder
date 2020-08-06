import React from "react";

import TextField from "@material-ui/core/TextField";

export default function TextInput(props) {
  const { setvalue, label, size, margin, value, validateFalse } = props;
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <TextField
      required
      variant="outlined"
      value={value}
      margin={margin ? margin : "dense"}
      label={label}
      size={size ? size : "small"}
      error={error}
      helperText={errorMessage}
      onChange={(e) => {
        if (validateFalse || !e.target.value.match(/^[A-Z]*$/)) {
          setvalue(e.target.value);
          setError(false);
          setErrorMessage("");
        } else {
          setvalue(e.target.value);
          setError(true);
          setErrorMessage("This field should not empty!!!");
        }
      }}
      fullWidth
    />
  );
}
