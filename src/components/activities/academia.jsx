import React from "react";
import { firestore } from "firebase";
import { useSnackbar } from "notistack";

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

export default function Academia() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

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

  const user = React.useContext(UserContext);
  const [pending, setPending] = React.useState(false);

  const save = (showProgress, newData, callback = () => {}) => {
    if (showProgress) setPending(true);
    firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          academia: newData.map((d) => ({ ...d, tableData: null })),
        },
        { merge: true }
      )
      .then(() => {
        if (showProgress) setPending(false);
        setData(newData);
        callback();
        enqueueSnackbar("Successfully saved data!", {
          variant: "success",
        });
      })
      .catch((e) => {
        if (showProgress) setPending(false);
        alert(e.message);
        callback();
        enqueueSnackbar("Failed to save data!", {
          variant: "error",
        });
      });
  };

  const validate = () => {
    if (exam && institute && board && yop && mark) return false;
    return true;
  };

  const addAcademic = () => {
    save(true, [
      ...data,
      {
        exam: exam,
        institute: institute,
        board: board,
        yop: yop,
        mark: mark,
      },
    ]);
    setExam("");
    setInstitute("");
    setBoard("");
    setYop("");
    setMark("");
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
        setPending(false);
        enqueueSnackbar("Failed to fetch data!", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar, user.uid]);

  return (
    <div>
      <CircularProgressIndicator display={pending} />
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.heading}>
          Academia
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextInput label="Examination" setvalue={setExam} value={exam} />
          </Grid>
          <Grid xs={12} item>
            <TextInput
              label="Institute/School"
              setvalue={setInstitute}
              value={institute}
            />
          </Grid>
          <Grid xs={12} item>
            <TextInput
              label="University/Board"
              setvalue={setBoard}
              value={board}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <TextInput label="Year of passing" setvalue={setYop} value={yop} />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <TextInput label="% of Marks" setvalue={setMark} value={mark} />
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
                save(false, [...dataUpdate], resolve);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                save(false, [...dataDelete], resolve);
              }, 1000);
            }),
        }}
      />
    </div>
  );
}
