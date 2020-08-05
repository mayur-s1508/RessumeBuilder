import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { auth } from "firebase";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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

const navList = [
  {
    title: "Personal Info",
    icon: <Icon>account_circle</Icon>,
    link: "/",
  },
  {
    title: "Academia",
    icon: <Icon>school</Icon>,
    link: "/academia",
  },
  {
    title: "Projects",
    icon: <Icon>engineering</Icon>,
    link: "/projects",
  },
  {
    title: "Certifications",
    icon: <Icon>card_membership</Icon>,
    link: "/certifications",
  },
  {
    title: "Activities",
    icon: <Icon>local_activity</Icon>,
    link: "/activities",
  },
  {
    title: "Upload Photo",
    icon: <Icon>insert_photo</Icon>,
    link: "/upload-photo",
  },
  {
    title: "Downloads",
    icon: <Icon>cloud_download</Icon>,
    link: "/download",
  },
];

function Sidenav(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { mobileOpen, handleDrawerToggle, window } = props;

  const [logout, setLogout] = React.useState(false);
  const logoutUser = () => {
    auth().signOut();
    setLogout(true);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navList.map((text, index) => (
          <ListItem
            button
            key={text.title}
            component={NavLink}
            to={text.link}
            activeClassName="active-nav-link"
            exact
          >
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={logoutUser}>
        <ListItemIcon>
          <Icon>power_settings_new</Icon>{" "}
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </div>
  );

  if (logout) return <Redirect to="/login" />;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidenav;
