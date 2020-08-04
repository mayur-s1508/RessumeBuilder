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
import UserContext from "../tools/user_info";
import { firestore } from "firebase";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
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
  const [maritalStatus, setMaritalStatus] = React.useState(null);
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
  const [techSkills, setTeckSkills] = React.useState("");

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
      address &&
      techSkills
    ) {
      return false;
    }
    return true;
  };
  const [pending, setPending] = React.useState(false);
  const user = React.useContext(UserContext);
  const save = () => {
    setPending(true);
    const data = {
      fName: fName,
      mName: mName,
      lName: lName,
      gender: gender,
      maritalStatus: maritalStatus,
      nationality: nationality,
      email: email,
      contactNo: contactNo,
      dob: dob,
      lang: lang,
      addShort: addShort,
      interest: interest,
      reference: reference,
      linkedinId: linkedinId,
      address: address,
      techSkills: techSkills,
    };
    firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          personalInfo: data,
        },
        { merge: true }
      )
      .then(() => {
        setPending(false);
        alert("Data saved successfully");
      })
      .catch((e) => {
        setPending(false);
        alert(e.message);
      });
  };

  React.useEffect(() => {
    setPending(true);
    console.log(1);
    firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().personalInfo !== undefined) {
          const data = doc.data().personalInfo;
          setFName(data.fName);
          setMName(data.mName);
          setLName(data.lName);
          setGender(data.gender);
          setMaritalStatus(data.maritalStatus);
          setNationality(data.nationality);
          setEmail(data.email);
          setContactNo(data.contactNo);
          setDob(data.dob);
          setLang(data.lang);
          setAddShort(data.addShort);
          setInterest(data.interest);
          setReference(data.reference);
          setLinkedinId(data.linkedinId);
          setAddress(data.address);
          setTeckSkills(data.techSkills);
        }
        setPending(false);
      })
      .catch((e) => {
        console.log(e);
        setPending(false);
      });
  }, [user.uid]);

  return (
    <Paper className={classes.root}>
      <CircularProgressIndicator display={pending} />
      <Typography variant="h4" className={classes.heading}>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid xs="12" sm="6" md="4" item>
          <TextInput label="First Name" setValue={setFName} value={fName} />
        </Grid>
        <Grid xs="12" sm="6" md="4" item>
          <TextInput label="Middle Name" setValue={setMName} value={mName} />
        </Grid>
        <Grid xs="12" sm="6" md="4" item>
          <TextInput label="Last Name" setValue={setLName} value={lName} />
        </Grid>
        <Grid xs="12" sm="6" md="4" item>
          <SelectInput
            label="Gender"
            options={["Male", "Female", "Other"]}
            getOptionLabel={(option) => option}
            setValue={setGender}
            value={gender}
          />
        </Grid>
        <Grid xs="12" sm="6" md="4" item>
          <SelectInput
            label="Marital Status"
            options={["Married", "Unmarried"]}
            getOptionLabel={(option) => option}
            setValue={setMaritalStatus}
            value={maritalStatus}
          />
          {/* <TextInput
            label="Marital Status"
            setValue={setMaritalStatus}
            value={maritalStatus}
          /> */}
        </Grid>
        <Grid xs="12" sm="6" md="4" item>
          <TextInput
            label="Nationality"
            setValue={setNationality}
            value={nationality}
          />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <EmailInput setEmail={setEmail} value={email} />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <NumberInput
            label="Contact No."
            setValue={setContactNo}
            value={contactNo}
          />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <TextInput
            label="Date of Birth"
            setValue={setDob}
            type="date"
            defaultValue="2000-01-01"
            value={dob}
          />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <TextInput label="Languages known" setValue={setLang} value={lang} />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <TextInput
            label="Linkedin ID"
            setValue={setLinkedinId}
            value={linkedinId}
          />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <TextInput
            label="District, State"
            setValue={setAddShort}
            value={addShort}
          />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <TextInput
            label="Interests"
            setValue={setInterest}
            value={interest}
          />
        </Grid>
        <Grid xs="12" sm="6" md="6" item>
          <TextInput
            label="Reference"
            setValue={setReference}
            value={reference}
          />
        </Grid>
        <Grid xs="12" item>
          <TextInput
            label="Correspondence &amp; Permanent Address"
            setValue={setAddress}
            value={address}
          />
        </Grid>
        <Grid xs="12" item>
          <TextInput
            label="Technical Skills"
            setValue={setTeckSkills}
            multiline
            rows={4}
            value={techSkills}
          />
        </Grid>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            disabled={validate()}
            onClick={save}
          >
            Save
          </Button>
        </CardActions>
      </Grid>
    </Paper>
  );
}

export default Personals;
