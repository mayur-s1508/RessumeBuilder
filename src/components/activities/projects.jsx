import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import MaterialTable from "material-table";
import TextInput from "../inputs/text_input";
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
function Projects() {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [data, setData] = React.useState([]);
  const columns = [
    { title: "Title", field: "title" },
    { title: "Subtitle", field: "subtitle" },
    { title: "Info", field: "info" },
  ];
  const validate = () => {
    if (title && subtitle && info) return false;
    return true;
  };

  const addAcademic = () => {
    setData(
      data.concat([
        {
          title: title,
          subtitle: subtitle,
          info: info,
        },
      ])
    );
    setTitle("");
    setSubtitle("");
    setInfo("");
  };

  const user = React.useContext(UserContext);
  const [pending, setPending] = React.useState(false);
  const save = () => {
    setPending(true);
    firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          projects: data,
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
        if (doc.exists && doc.data().projects !== undefined) {
          setData(doc.data().projects);
        }
        setPending(false);
      })
      .catch((e) => {
        console.log(e);
        setPending(false);
      });
  }, [user.uid]);

  return (
    <div>
      <CircularProgressIndicator display={pending} />
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.heading}>
          Project Details
        </Typography>
        <Grid container spacing={3}>
          <Grid xs="12" item>
            <TextInput label="Title" setValue={setTitle} value={title} />
          </Grid>
          <Grid xs="12" item>
            <TextInput
              label="Subtitle"
              setValue={setSubtitle}
              value={subtitle}
            />
          </Grid>
          <Grid xs="12" item>
            <TextInput label="Info" setValue={setInfo} value={info} />
          </Grid>

          <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={addAcademic}
              disabled={validate()}
            >
              Add
            </Button>
          </CardActions>
        </Grid>
      </Paper>
      <MaterialTable
        columns={columns}
        data={data}
        style={{ margin: "32px 9px" }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="primary"
          disabled={data.length === 0}
          onClick={save}
        >
          Save
        </Button>
      </CardActions>
    </div>
  );
}

export default Projects;
