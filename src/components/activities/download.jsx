import React from "react";
import { Paper, Grid, makeStyles, Divider } from "@material-ui/core";
import logo from "../../images/logo.jpg";
import "./download.css";

const useStyle = makeStyles((theme) => ({
  //   root: {
  //     fontFamily: '"Times New Roman", Times, serif',
  //   },
  logo: {
    width: "100px",
    position: "absolute",
  },
  photo: {
    width: "100px",
    position: "absolute",
  },
}));

function Download() {
  const classes = useStyle();
  return (
    <div className="download">
      <Paper>
        {/* <img src={logo} alt="CSMSS" className={classes.logo} />
      <img src={logo} alt="CSMSS" className={classes.photo} /> */}
        <h2>
          <u>NIKHIL NANDKUMAR WAYKOS</u>
        </h2>
        <Grid container>
          <Grid xs="8" item>
            <span>
              <b>E-mail:</b> <a href="www.google.com">waykosn@gmail.com</a>
            </span>
          </Grid>
          <Grid xs="4" item>
            <span>
              <b>Contact No.:</b> +91 95116 64263
            </span>
          </Grid>
          <Grid xs="8" item>
            <span>
              <b>LinkedIn ID:</b>{" "}
              <a href="www.google.com">
                https://in.linkedin.com/in/nikhil-waykos-083610146
              </a>
            </span>
          </Grid>
          <Grid xs="4" item>
            <span>
              <b>Address:</b> Aurangabad, MH, India.
            </span>
          </Grid>
          <Divider />
          <h4>ACADEMIA</h4>
          <table>
            <tr>
              <th>Examination</th>
              <th>Institute/School</th>
              <th>University/Board</th>
              <th>Year of passing</th>
              <th>% of Marks</th>
            </tr>
            <tr>
              <td>B. Tech. – Computer Science and Engineering</td>
              <td>CSMSS Chh. Shahu College of Engineering, Aurangabad</td>
              <td>Dr. B. A. T. U., Lonere</td>
              <td>2021</td>
              <td>Pursing (3rd year – 8.89)</td>
            </tr>
          </table>
          <Divider />
          <h4>PROJECT DETAILS</h4>
          <div>
            <ul>
              <li>
                <b>GIZ MASSIA PROJECT (2019-20)</b> - Static Website Development
                - URL: www.omsaiindustries.com
              </li>
            </ul>
          </div>
          <Divider />
          <h4>CERTIFICATION, TECHNICAL SKILLS &amp; LEARNING</h4>
          <div>
            <ul>
              <li>
                <b>GIZ MASSIA PROJECT (2019-20)</b> - Static Website Development
                - URL: www.omsaiindustries.com
              </li>
            </ul>
          </div>
          <Divider />
          <h4>PARTICIPATED ACTIVITIES &amp; ACHIEVEMENTS</h4>
          <div>
            <ul>
              <li>
                <b>GIZ MASSIA PROJECT (2019-20)</b> - Static Website Development
                - URL: www.omsaiindustries.com
              </li>
            </ul>
          </div>
          <Divider />
          <h4>CERTIFICATION, TECHNICAL SKILLS &amp; LEARNING</h4>
          <table>
            <tr>
              <td>
                Correspondence &amp; Permanent Address: 55,Arunoday
                Col.SataraParisar, Aurangabad, Maharashtra - 431010.
              </td>
            </tr>
            <tr>
              <td>
                <b>DOB &amp; Gender:</b>
              </td>
              <td>
                <b>Marital Status:</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Interests:</b>
              </td>
              <td>
                <b>Nationality:</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Languages known:</b>
              </td>
              <td>
                <b>Reference:</b>
              </td>
            </tr>
          </table>
          <p>
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
        </Grid>
      </Paper>
    </div>
  );
}

export default Download;
