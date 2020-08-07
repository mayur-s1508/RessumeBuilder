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
    width: "100%",
    justifyContent: "center",
  },
}));
function Internship() {
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
    if (title) return false;
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
          internship: data,
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

    firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().internship !== undefined) {
          setData(doc.data().internship);
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
          Internship Details
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextInput label="Title" setvalue={setTitle} value={title} />
          </Grid>
          <Grid xs={12} item>
            <TextInput
              label="Subtitle"
              setvalue={setSubtitle}
              value={subtitle}
              validateFalse={true}
            />
          </Grid>
          <Grid xs={12} item>
            <TextInput
              label="Info"
              setvalue={setInfo}
              value={info}
              validateFalse={true}
            />
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
        title=""
        columns={columns}
        data={data}
        style={{ margin: "32px 9px" }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
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
          // disabled={data.length === 0}
          onClick={save}
        >
          Save
        </Button>
      </CardActions>
    </div>
  );
}

export default Internship;