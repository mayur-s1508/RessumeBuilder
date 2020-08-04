import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

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

export default function RadioInput(props) {
  const { label, options, setValue } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography className={classes.label}>{label}</Typography>
      </FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        //   value={value}
        onChange={handleChange}
        row
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            key={option.label}
            label={option.label}
          />
        ))}
      </RadioGroup>

      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}
