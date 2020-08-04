import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formGroup: {
    display: "flex",
  },
  label: {
    fontWeight: "700",
    fontSizez: "16px",
    marginLeft: 0,
    color: "#000",
  },
}));

export default function CheckboxInput(props) {
  const { label, value, setValue } = props;
  const classes = useStyles();
  console.log(value);
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.checked });
  };
  return (
    <div>
      <FormControl component="fieldset" required="true">
        <FormLabel component="legend">
          <Typography className={classes.label}>{label}</Typography>
        </FormLabel>
        <FormGroup row required>
          {Object.entries(value).map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option[1]}
                  onChange={handleChange}
                  name={option[0]}
                />
              }
              key={option[0]}
              label={option[0]}
            />
          ))}
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    </div>
  );
}
