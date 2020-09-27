import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";
import Appbar from "../navigation/appbar";
import Sidenav from "../navigation/sidenav";
import Personals from "../activities/personals";
import Academia from "../activities/academia";
import Projects from "../activities/projects";
import Certifications from "../activities/certifications";
import Internship from "../activities/internship";
import Por from "../activities/por";
import Activities from "../activities/activities";
import Download from "../activities/download";
import PageNotFound from "../tools/not_found";
import UploadPhoto from "../activities/upload_photo";
// import Instructions from "../tools/instructions";
import Copyright from "../tools/copyright";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar handleDrawerToggle={handleDrawerToggle} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        window={window}
      />
      {/* <Instructions /> */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={Personals} />
          <Route path="/academia" component={Academia} />
          <Route path="/projects" component={Projects} />
          <Route path="/certifications" component={Certifications} />
          <Route path="/internship" component={Internship} />
          <Route path="/position-of-responsibility" component={Por} />
          <Route path="/activities" component={Activities} />
          <Route path="/upload-photo" component={UploadPhoto} />
          <Route path="/download" component={Download} />
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Copyright />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
