import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function DownloadSettings(props) {
  const classes = useStyles();
  const {
    open,
    setOpen,
    clgLogo,
    setClgLogo,
    profilePicture,
    setProfilePicture,
    pageBreak,
    setPageBreak,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Resume Settings
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <Grid container>
            <Grid xs="12" item>
              <DialogContentText variant="body1">
                Images Setting
              </DialogContentText>
            </Grid>
            <Grid xs="6" item>
              <FormControlLabel
                control={
                  <Switch
                    checked={clgLogo}
                    onChange={(e) => setClgLogo(!clgLogo)}
                    color="primary"
                  />
                }
                label="College Logo"
              />
            </Grid>
            <Grid xs="6" item>
              <FormControlLabel
                control={
                  <Switch
                    checked={profilePicture}
                    onChange={(e) => setProfilePicture(!profilePicture)}
                    color="primary"
                  />
                }
                label="Profile Image"
              />
            </Grid>
            <Grid xs="12" item>
              <DialogContentText variant="body1" style={{ marginTop: "16px" }}>
                Page Break Setting
              </DialogContentText>
            </Grid>
            <Grid xs="12" item>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Page break after
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pageBreak}
                  onChange={(event) => setPageBreak(event.target.value)}
                >
                  <MenuItem value={0}>Auto</MenuItem>
                  <MenuItem value={1}>Projects</MenuItem>
                  <MenuItem value={2}>
                    Certifications, Skills, Learning
                  </MenuItem>
                  <MenuItem value={3}>Internship</MenuItem>
                  <MenuItem value={4}>Position of Responsibility</MenuItem>
                  <MenuItem value={5}>Activities</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
