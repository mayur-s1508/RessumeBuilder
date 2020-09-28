import React from "react";
import { firestore } from "firebase";
import { useSnackbar } from "notistack";

import BaseTable from "../tools/base_table";
import UserContext from "../tools/user_info";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
import BaseForm from "../tools/base_form";

export default function Projects() {
  const [data, setData] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { title: "Title", field: "title" },
    { title: "Subtitle", field: "subtitle" },
    { title: "Info", field: "info" },
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
          projects: newData.map((d) => ({ ...d, tableData: null })),
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

  React.useEffect(() => {
    setPending(true);
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
        setPending(false);
        enqueueSnackbar("Failed to fetch data!", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar, user.uid]);

  return (
    <div>
      <CircularProgressIndicator display={pending} />
      <BaseForm data={data} save={save} headline="Project Details" />
      <BaseTable columns={columns} data={data} save={save} />
    </div>
  );
}
