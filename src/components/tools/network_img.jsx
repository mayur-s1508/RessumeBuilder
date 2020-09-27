import React from "react";
import { app } from "firebase";
import ProgressIndicator from "./circular_progress_indicator";

export default function NetworkImg(props) {
  const [src, setSrc] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { path, maxWidth, maxHeight, alt } = props;

  const storageRef = app().storage().ref();

  React.useEffect(() => {
    // setLoading(true);
    try {
      storageRef
        .child(path)
        .getDownloadURL()
        .then((url) => {
          setSrc(url);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  }, [storageRef, path]);

  if (loading) return <ProgressIndicator display="true" />;

  return (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: maxWidth ? maxWidth : "70px",
        maxHeight: maxHeight ? maxHeight : "60px",
      }}
      {...props}
    />
  );
}
