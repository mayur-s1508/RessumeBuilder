import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function SelectInput(props) {
  const { options, getOptionLabel, setvalue, label, size, value } = props;
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <Autocomplete
      id={"select-" + label}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(e, value) => {
        if (value === null) {
          setIsError(true);
          setErrorMessage("Please select atleast one option");
          setvalue(null);
        } else {
          setIsError(false);
          setErrorMessage("");
          setvalue(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          value={value}
          // required
          size={size ? size : "small"}
          fullWidth
          helperText={errorMessage}
          error={isError}
        />
      )}
    />
  );
}
