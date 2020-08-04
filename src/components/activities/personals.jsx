import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import TextInput from "../inputs/text_input";
import EmailInput from "../inputs/email_input";
import NumberInput from "../inputs/number_input";
import SelectInput from "../inputs/select_input";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
  },
  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  cardActions: {
    display: "flex",
    alignItems: "flex-end",
    right: 0,
  },
}));
function Personals() {
  const classes = useStyles();
  const [fName, setFName] = React.useState("");
  const [mName, setMName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [gender, setGender] = React.useState(null);
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contactNo, setContactNo] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [lang, setLang] = React.useState("");
  const [addShort, setAddShort] = React.useState("");
  const [interest, setInterest] = React.useState("");
  const [reference, setReference] = React.useState("");
  const [linkedinId, setLinkedinId] = React.useState("");
  const [address, setAddress] = React.useState("");

  const validate = () => {
    if (
      fName &&
      mName &&
      lName &&
      gender &&
      maritalStatus &&
      nationality &&
      email &&
      contactNo &&
      dob &&
      lang &&
      addShort &&
      interest &&
      reference &&
      linkedinId &&
      address
    ) {
      return false;
    }
    return true;
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Personal Details
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid xs="12" sm="6" md="4" item>
            <TextInput label="First Name" setValue={setFName} />
          </Grid>
          <Grid xs="12" sm="6" md="4" item>
            <TextInput label="Middle Name" setValue={setMName} />
          </Grid>
          <Grid xs="12" sm="6" md="4" item>
            <TextInput label="Last Name" setValue={setLName} />
          </Grid>
          <Grid xs="12" sm="6" md="4" item>
            <SelectInput
              label="Gender"
              options={["Male", "Female", "Other"]}
              getOptionLabel={(option) => option}
              setValue={setGender}
            />
          </Grid>
          <Grid xs="12" sm="6" md="4" item>
            <TextInput label="Marital Status" setValue={setMaritalStatus} />
          </Grid>
          <Grid xs="12" sm="6" md="4" item>
            <TextInput label="Nationality" setValue={setNationality} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <EmailInput setEmail={setEmail} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <NumberInput label="Contact No." setValue={setContactNo} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <TextInput
              label="Date of Birth"
              setValue={setDob}
              type="date"
              defaultValue="2000-01-01"
            />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <TextInput label="Languages known" setValue={setLang} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <TextInput label="Linkedin ID" setValue={setLinkedinId} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <TextInput label="District, State" setValue={setAddShort} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <TextInput label="Interests" setValue={setInterest} />
          </Grid>
          <Grid xs="12" sm="6" md="6" item>
            <TextInput label="Reference" setValue={setReference} />
          </Grid>
          <Grid xs="12" item>
            <TextInput
              label="Correspondence &amp; Permanent Address"
              setValue={setAddress}
            />
          </Grid>
          <CardActions className={classes.cardActions}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={validate()}
            >
              Save
            </Button>
          </CardActions>
        </Grid>
      </form>
    </Paper>
  );
}

export default Personals;
