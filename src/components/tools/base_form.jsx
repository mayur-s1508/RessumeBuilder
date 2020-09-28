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

function BaseForm(props) {
  const classes = useStyles();
  const { data, save, headline } = props;
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [info, setInfo] = React.useState("");

  const validate = () => {
    if (title) return false;
    return true;
  };

  const addNewData = () => {
    save(true, [{ title: title, subtitle: subtitle, info: info }, ...data]);
    setTitle("");
    setSubtitle("");
    setInfo("");
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        {headline}
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} item>
          <TextInput label="Title" setvalue={setTitle} value={title} />
        </Grid>
        <Grid xs={12} item>
          <TextInput
            optional="true"
            label="Subtitle"
            setvalue={setSubtitle}
            value={subtitle}
            validateFalse={true}
          />
        </Grid>
        <Grid xs={12} item>
          <TextInput
            optional="true"
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
            onClick={addNewData}
            disabled={validate()}
          >
            Add
          </Button>
        </CardActions>
      </Grid>
    </Paper>
  );
}

export default BaseForm;
