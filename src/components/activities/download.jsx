import React from "react";
import "./download.css";
import html2pdf from "html2pdf.js";
import { firestore } from "firebase";

import { Paper, Grid, Button, Link } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SettingsApplications from "@material-ui/icons/Settings";

import logo from "../../images/logo.jpg";
import CircularProgressIndicator from "../tools/circular_progress_indicator";
import NetworkImage from "../tools/network_img";
import UserContext from "../tools/user_info";
import DownloadSettings from "../tools/download_settings";

function formatDate(date) {
  const d = new Date(date);
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

function Download() {
  const [data, setData] = React.useState(null);
  const [msg, setMsg] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const user = React.useContext(UserContext);

  const [profilePicture, setProfilePicture] = React.useState(true);
  const [clgLogo, setClgLogo] = React.useState(true);
  const [pageBreak, setPageBreak] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    setPending(true);
    firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          setData(docData);
          if (docData.personalInfo === undefined) {
            setMsg("Please complete personal info details!");
          } else if (docData.academia === undefined)
            setMsg("Please complete academia details!");
          // else if (docData.projects === undefined)
          //   setMsg("Please complete projects details!");
          // else if (docData.certifications === undefined)
          //   setMsg("Please complete certifications details!");
          // else if (docData.activities === undefined)
          //   setMsg("Please complete activities details!");
          // else if (docData.imagePath === undefined)
          //   setMsg("Please upload your photo!");
        } else {
          setMsg("Please complete personal info details!");
        }
        setPending(false);
      });
  }, [user.uid, setData, setMsg]);

  if (msg !== "") return <h4>{msg}</h4>;
  if (pending) return <CircularProgressIndicator display={pending} />;

  const download = () => {
    setDisabled(true);
    let imagenes = document.getElementsByTagName("img");
    for (let i = 0; i < imagenes.length; i++) {
      imagenes[i].setAttribute("crossorigin", "*");
    }
    var element = document.getElementById("idd");
    var opt = {
      margin: 0,
      filename: "resume.pdf",
      html2canvas: {
        // letterRendering: true,
        useCORS: true,
        scale: 4,
      },
      jsPDF: { unit: "mm", format: "a4" },
    };
    html2pdf(element, opt).then(() => {
      setDisabled(false);
    });
  };

  return (
    <div>
      <DownloadSettings
        open={open}
        setOpen={setOpen}
        clgLogo={clgLogo}
        setClgLogo={setClgLogo}
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        pageBreak={pageBreak}
        setPageBreak={setPageBreak}
      />
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
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="split button"
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ margin: "auto" }}
            startIcon={<CloudDownloadIcon />}
            onClick={download}
            disabled={disabled}
          >
            Download
          </Button>
          <Button onClick={handleClickOpen}>
            <SettingsApplications />
          </Button>
        </ButtonGroup>
      </div>
      <div className="download" id="idd">
        <Paper className="download-body">
          <img
            src={logo}
            alt="CSMSS"
            className="logo"
            style={{ display: clgLogo ? "inherit" : "none" }}
          />
          {data && data.imagePath ? (
            <NetworkImage
              path={data.imagePath}
              className="photo"
              style={{ display: profilePicture ? "inherit" : "none" }}
              alt="Profile Image"
            />
          ) : (
            ""
          )}
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
            <Grid xs={8} item>
              <span>
                <b>E-mail: </b>
                <Link href={data ? data.personalInfo.email : ""}>
                  {data ? data.personalInfo.email : ""}
                </Link>
              </span>
            </Grid>
            <Grid xs={4} item style={{ marginLeft: "-24px" }}>
              <span>
                <b>Contact No.: </b>+91{" "}
                {data ? data.personalInfo.contactNo : ""}
              </span>
            </Grid>
            <Grid xs={8} item>
              <span>
                <b>LinkedIn ID: </b>
                <Link href={data ? data.personalInfo.linkedinId : ""}>
                  {data ? data.personalInfo.linkedinId : ""}
                </Link>
              </span>
            </Grid>
            <Grid xs={4} item style={{ marginLeft: "-24px" }}>
              <span>
                <b>Address: </b>
                {data ? data.personalInfo.addShort : ""}
              </span>
            </Grid>
            <hr className="hr-line" />
            <h4 className="title1">ACADEMIA</h4>
            <table className="table1">
              <thead>
                <tr>
                  <th>Examination</th>
                  <th>Institute/School</th>
                  <th>University/Board</th>
                  <th>YoP</th>
                  <th>% of Marks</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.academia
                    .slice()
                    .reverse()
                    .map((e, index) => (
                      <tr key={index}>
                        <td>{e.exam}</td>
                        <td>{e.institute}</td>
                        <td>{e.board}</td>
                        <td>{e.yop}</td>
                        <td>{e.mark}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr className="hr-line" />
            {data &&
            data.projects !== undefined &&
            data.projects.length !== 0 ? (
              <>
                <h4 className="title1">PROJECT DETAILS</h4>
                <div>
                  <ul>
                    {data
                      ? data.projects
                          .slice()
                          .reverse()
                          .map((e, index) => (
                            <li key={index}>
                              <b>{e.title}</b>
                              {e.subtitle ? " – " + e.subtitle : ""}
                              {e.info ? " – " + e.info : ""}
                            </li>
                          ))
                      : ""}
                  </ul>
                </div>
                <hr className="hr-line" />
                <hr
                  className={pageBreak === 1 ? "html2pdf__page-break" : ""}
                  style={{
                    display: "block",
                    marginTop: "0px",
                    color: "transparent",
                  }}
                />
              </>
            ) : (
              ""
            )}
            {data &&
            data.certifications !== undefined &&
            data.certifications.length !== 0 ? (
              <>
                <h4 className="title1">
                  CERTIFICATION, TECHNICAL SKILLS &amp; LEARNING
                </h4>
                <div>
                  <ul>
                    {data
                      ? data.certifications
                          .slice()
                          .reverse()
                          .map((e, index) => (
                            <li key={index}>
                              <b>{e.title}</b>
                              {e.subtitle ? " – " + e.subtitle : ""}
                              {e.info ? " – " + e.info : ""}
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
                <hr
                  className={pageBreak === 2 ? "html2pdf__page-break" : ""}
                  style={{
                    display: "block",
                    marginTop: "0px",
                    color: "transparent",
                  }}
                />
              </>
            ) : (
              ""
            )}
            {data &&
            data.internship !== undefined &&
            data.internship.length !== 0 ? (
              <>
                <h4 className="title1">INTERNSHIP</h4>
                <div>
                  <ul>
                    {data
                      ? data.internship
                          .slice()
                          .reverse()
                          .map((e, index) => (
                            <li key={index}>
                              <b>{e.title}</b>
                              {e.subtitle ? " – " + e.subtitle : ""}
                              {e.info ? " – " + e.info : ""}
                            </li>
                          ))
                      : ""}
                  </ul>
                </div>
                <hr className="hr-line" />
                <hr
                  className={pageBreak === 3 ? "html2pdf__page-break" : ""}
                  style={{
                    display: "block",
                    marginTop: "0px",
                    color: "transparent",
                  }}
                />
              </>
            ) : (
              ""
            )}
            {data && data.por !== undefined && data.por.length !== 0 ? (
              <>
                <h4 className="title1">POSITIONS OF RESPONSIBILITY</h4>
                <div>
                  <ul>
                    {data
                      ? data.por
                          .slice()
                          .reverse()
                          .map((e, index) => (
                            <li key={index}>
                              <b>{e.title}</b>
                              {e.subtitle ? " – " + e.subtitle : ""}
                              {e.info ? " – " + e.info : ""}
                            </li>
                          ))
                      : ""}
                  </ul>
                </div>
                <hr className="hr-line" />
                <hr
                  className={pageBreak === 4 ? "html2pdf__page-break" : ""}
                  style={{
                    display: "block",
                    marginTop: "0px",
                    color: "transparent",
                  }}
                />
              </>
            ) : (
              ""
            )}
            {data &&
            data.activities !== undefined &&
            data.activities.length !== 0 ? (
              <>
                <h4 className="title1">
                  PARTICIPATED ACTIVITIES &amp; ACHIEVEMENTS
                </h4>
                <div>
                  <ul>
                    {data
                      ? data.activities
                          .slice()
                          .reverse()
                          .map((e, index) => (
                            <li key={index}>
                              <b>{e.title}</b>
                              {e.subtitle ? " – " + e.subtitle : ""}
                              {e.info ? " – " + e.info : ""}
                            </li>
                          ))
                      : ""}
                  </ul>
                </div>
                <hr className="hr-line" />
                <hr
                  className={pageBreak === 5 ? "html2pdf__page-break" : ""}
                  style={{
                    display: "block",
                    marginTop: "0px",
                    color: "transparent",
                  }}
                />
              </>
            ) : (
              ""
            )}
            <h4 className="title1">PERSONAL INFORMATION</h4>
            <table className="table1">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <b>Correspondence &amp; Permanent Address:</b>{" "}
                    {data ? data.personalInfo.address : ""}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>DOB &amp; Gender:</b>{" "}
                    {data
                      ? formatDate(data.personalInfo.dob) +
                        " – " +
                        data.personalInfo.gender
                      : ""}
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
              </tbody>
            </table>
            <p className="self-att">
              I do hereby confirm that the above information is true to the best
              of my knowledge and belief.
            </p>
            <Grid container>
              <Grid xs={4} item>
                <b>Date:</b>
              </Grid>
              <Grid xs={4} item>
                <b>Place:</b>
              </Grid>
              <Grid xs={4} item>
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
