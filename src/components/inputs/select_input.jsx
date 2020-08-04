import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function SelectInput(props) {
  const { options, getOptionLabel, setValue, label, size, value } = props;
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={getOptionLabel}
      error={isError}
      helperText={errorMessage}
      onChange={(e, value) => {
        if (value === null) {
          setIsError(true);
          setErrorMessage("Please select atleast one option");
          setValue(null);
        } else {
          setIsError(false);
          setErrorMessage("");
          setValue(value);
        }
      }}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          value={value}
          // required
          size={size ? size : "small"}
          fullWidth
        />
      )}
    />
  );
}
