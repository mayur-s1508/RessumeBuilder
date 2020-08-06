import React from "react";
import { Paper, makeStyles, Button, Typography } from "@material-ui/core";
import UserContext from "../tools/user_info";
import { firestore, storage } from "firebase";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
import FileInput from "../inputs/file_input";
import NetworkImage from "../tools/network_img";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
    justifyContent: "center",
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

function UploadPhoto(props) {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [imagePath, setImagePath] = React.useState("");
  const user = React.useContext(UserContext);

  const uploadPhoto = () => {
    setPending(true);
    const storageRef = storage().ref();
    var metadata = {
      contentType: "image/jpeg",
    };
    storageRef
      .child("users/" + user.uid)
      .put(files[0], metadata)
      .then((r) => {
        firestore()
          .collection("users")
          .doc(user.uid)
          .set(
            {
              imagePath: r.ref.location.path,
            },
            { merge: true }
          )
          .then(() => {
            setPending(false);
            alert("Image uploaded successfully!");
          })
          .catch((e) => {
            alert(e.message);
          });
      })
      .catch((e) => {
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
        if (doc.exists && doc.data().imagePath) {
          setImagePath(doc.data().imagePath);
        }
        setPending(false);
      });
  }, [user.uid, setImagePath, imagePath]);
  return (
    <div>
      <CircularProgressIndicator display={pending} />
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.heading}>
          Profile Photo
        </Typography>
        {imagePath ? (
          <div style={{ marginBottom: "24px" }}>
            <h2>Current Image</h2>
            <NetworkImage path={imagePath} />
          </div>
        ) : (
          ""
        )}
        <FileInput files={files} setFiles={setFiles} />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ marginTop: "24px" }}
          disabled={files.length === 0}
          onClick={uploadPhoto}
        >
          Save
        </Button>
      </Paper>
    </div>
  );
}

export default UploadPhoto;
