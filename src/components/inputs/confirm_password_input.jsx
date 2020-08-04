import React from "react";

import TextField from "@material-ui/core/TextField";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function ConfirmPasswordInput(props) {
  const { setPassword, size, password } = props;

  const [passswordError, setPassswordError] = React.useState(false);
  const [passswordErrorMessage, setPassswordErrorMessage] = React.useState("");

  // show password handle
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [value, setValue] = React.useState("");
  // when password change
  React.useEffect(() => {
    console.log("test");
    if (value !== "" && !passswordError) {
      console.log("test1");

      if (password !== value) {
        console.log("test2");

        setPassswordError(true);
        setPassswordErrorMessage("Does not match with password!");
        setPassword("");
      }
    }
  }, [value, password, passswordError, setPassword]);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      size={size ? size : "normal"}
      name="password"
      label="Password"
      id="password"
      autoComplete="current-password"
      error={passswordError}
      helperText={passswordErrorMessage}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (e.target.value.length < 8) {
          setPassswordError(true);
          setPassswordErrorMessage("Invalid Password!!");
          setPassword("");
        } else if (e.target.value !== password) {
          setPassswordError(true);
          setPassswordErrorMessage("Does not match with password!");
          setPassword("");
        } else {
          setPassswordError(false);
          setPassswordErrorMessage("");
          setPassword(e.target.value);
        }
      }}
      type={showPassword ? "text" : "password"} // <-- This is where the magic happens
      InputProps={{
        // <-- This is where the toggle button is added.
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
