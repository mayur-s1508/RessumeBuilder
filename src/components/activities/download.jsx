import React from "react";

import { Paper, Grid, Button } from "@material-ui/core";
import logo from "../../images/logo.jpg";
import "./download.css";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
import { firestore } from "firebase";
import UserContext from "../tools/user_info";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import html2pdf from "html2pdf.js";
import NetworkImage from "../tools/network_img";
// const useStyle = makeStyles((theme) => ({
//   //   root: {
//   //     fontFamily: '"Times New Roman", Times, serif',
//   //   },
//   logo: {
//     width: "100px",
//     position: "absolute",
//   },
//   photo: {
//     width: "100px",
//     position: "absolute",
//   },
// }));

function Download() {
  const [data, setData] = React.useState(null);
  const [pending, setPending] = React.useState(false);
  const user = React.useContext(UserContext);
  React.useEffect(() => {
    setPending(true);
    firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setData(doc.data());
        } else {
        }
        setPending(false);
      });
  }, [user.uid, setData]);

  if (pending) return <CircularProgressIndicator display={pending} />;
  const download = () => {
    var element = document.getElementById("idd");
    html2pdf(element, { html2canvas: { scale: 8 } });
  };
  return (
    <div>
      <div
        className="text-center w-100 mr-auto justify-content-center"
        style={{
          padding: "auto",
          marginBottom: "24px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ margin: "auto" }}
          startIcon={<CloudDownloadIcon />}
          onClick={download}
        >
          Download
        </Button>
      </div>

      <div className="download" id="idd">
        <Paper className="download-body">
          <img src={logo} alt="CSMSS" className="logo" />
          {data ? <NetworkImage path={data.imagePath} className="photo" /> : ""}
          <h2 className="name">
            <u>
              {data
                ? data.personalInfo.fName +
                  " " +
                  data.personalInfo.mName +
                  " " +
                  data.personalInfo.lName
                : ""}
            </u>
          </h2>
          <Grid container className="header">
            <Grid xs="8" item>
              <span>
                <b>E-mail:</b>{" "}
                <a href={data ? data.personalInfo.email : ""}>
                  {data ? data.personalInfo.email : ""}
                </a>
              </span>
            </Grid>
            <Grid xs="4" item>
              <span>
                <b>Contact No.:</b> +91{" "}
                {data ? data.personalInfo.contactNo : ""}
              </span>
            </Grid>
            <Grid xs="8" item>
              <span>
                <b>LinkedIn ID:</b>{" "}
                <a href={data ? data.personalInfo.linkedinId : ""}>
                  {data ? data.personalInfo.linkedinId : ""}
                </a>
              </span>
            </Grid>
            <Grid xs="4" item>
              <span>
                <b>Address:</b> {data ? data.personalInfo.addShort : ""}
              </span>
            </Grid>
            <hr className="hr-line" />
            <h4 className="title1">ACADEMIA</h4>
            <table className="table1">
              <tr>
                <th>Examination</th>
                <th>Institute/School</th>
                <th>University/Board</th>
                <th>YoP</th>
                <th>% of Marks</th>
              </tr>
              {data
                ? data.academia
                    .slice()
                    .reverse()
                    .map((e) => (
                      <tr>
                        <td>{e.exam}</td>
                        <td>{e.institute}</td>
                        <td>{e.board}</td>
                        <td>{e.yop}</td>
                        <td>{e.mark}</td>
                      </tr>
                    ))
                : ""}
            </table>
            <hr className="hr-line" />
            <h4 className="title1">PROJECT DETAILS</h4>
            <div>
              <ul>
                {data
                  ? data.projects
                      .slice()
                      .reverse()
                      .map((e) => (
                        <li>
                          <b>{e.title}</b>
                          {e.subtitle ? " - " + e.subtitle : ""}
                          {e.info ? " - " + e.info : ""}
                        </li>
                      ))
                  : ""}
              </ul>
            </div>
            <hr className="hr-line" />
            <h4 className="title1">
              CERTIFICATION, TECHNICAL SKILLS &amp; LEARNING
            </h4>
            <div>
              <ul>
                {data
                  ? data.certifications
                      .slice()
                      .reverse()
                      .map((e) => (
                        <li>
                          <b>{e.title}</b>
                          {e.subtitle ? " - " + e.subtitle : ""}
                          {e.info ? " - " + e.info : ""}
                        </li>
                      ))
                  : ""}
              </ul>
              <p className="teck-skills">
                <b>&nbsp; Technical Skills:</b>{" "}
                {data ? data.personalInfo.techSkills : ""}
              </p>
            </div>
            <hr className="hr-line" />
            <h4 className="title1">
              PARTICIPATED ACTIVITIES &amp; ACHIEVEMENTS
            </h4>
            <div>
              <ul>
                {data
                  ? data.activities
                      .slice()
                      .reverse()
                      .map((e) => (
                        <li>
                          <b>{e.title}</b>
                          {e.subtitle ? " - " + e.subtitle : ""}
                          {e.info ? " - " + e.info : ""}
                        </li>
                      ))
                  : ""}
              </ul>
            </div>
            <hr className="hr-line" />
            <h4 className="title1">PERSONAL INFORMATION</h4>
            <table className="table1">
              <tr>
                <td colspan="2">
                  <b>Correspondence &amp; Permanent Address:</b>{" "}
                  {data ? data.personalInfo.address : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <b>DOB &amp; Gender:</b>{" "}
                  {data ? data.personalInfo.gender : ""}
                </td>
                <td>
                  <b>Marital Status:</b>{" "}
                  {data ? data.personalInfo.maritalStatus : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Interests:</b> {data ? data.personalInfo.interest : ""}
                </td>
                <td>
                  <b>Nationality:</b>{" "}
                  {data ? data.personalInfo.nationality : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Languages known:</b> {data ? data.personalInfo.lang : ""}
                </td>
                <td>
                  <b>Reference:</b> {data ? data.personalInfo.reference : ""}
                </td>
              </tr>
            </table>
            <p className="self-att">
              I do hereby confirm that the above information is true to the best
              of my knowledge and belief.
            </p>
            <Grid container>
              <Grid xs="4" item>
                <b>Date:</b>
              </Grid>
              <Grid xs="4" item>
                <b>Place:</b>
              </Grid>
              <Grid xs="4" item>
                <b>Sign:</b>
              </Grid>
            </Grid>
            <hr className="hr-line" />
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default Download;
