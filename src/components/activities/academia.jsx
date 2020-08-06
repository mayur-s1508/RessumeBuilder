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
function Academia() {
  const classes = useStyles();
  const [exam, setExam] = React.useState("");
  const [institute, setInstitute] = React.useState("");
  const [board, setBoard] = React.useState("");
  const [yop, setYop] = React.useState("");
  const [mark, setMark] = React.useState("");
  const [data, setData] = React.useState([]);
  const columns = [
    { title: "Examination", field: "exam" },
    { title: "Institute/School", field: "institute" },
    { title: "University/Board", field: "board" },
    { title: "Year of passing", field: "yop" },
    { title: "% of Marks", field: "mark" },
  ];

  const validate = () => {
    if (exam && institute && board && yop && mark) return false;
    return true;
  };

  const addAcademic = () => {
    setData(
      data.concat([
        {
          exam: exam,
          institute: institute,
          board: board,
          yop: yop,
          mark: mark,
        },
      ])
    );
    setExam("");
    setInstitute("");
    setBoard("");
    setYop("");
    setMark("");
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
          academia: data,
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
        if (doc.exists && doc.data().academia !== undefined) {
          setData(doc.data().academia);
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
          Academia
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextInput label="Examination" setValue={setExam} value={exam} />
          </Grid>
          <Grid xs={12} item>
            <TextInput
              label="Institute/School"
              setValue={setInstitute}
              value={institute}
            />
          </Grid>
          <Grid xs={12} item>
            <TextInput
              label="University/Board"
              setValue={setBoard}
              value={board}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <TextInput label="Year of passing" setValue={setYop} value={yop} />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <TextInput label="% of Marks" setValue={setMark} value={mark} />
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

export default Academia;
