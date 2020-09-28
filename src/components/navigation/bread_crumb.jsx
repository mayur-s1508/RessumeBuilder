import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Route } from "react-router";
import { Link as RouterLink } from "react-router-dom";

const disabledLinks = ["/suppliers", "/orders", "/inventory"];

const breadcrumbNameMap = {
  "/": "Home",
  "/certifications": "Certifications",
  "/academia": "Academia",
  "/projects": "Projects",
  "/internship": "Internship",
  "/position-of-responsibility": "Position of Responsibility",
  "/activities": "Activities",
  "/upload-photo": "Upload Photo",
  "/download": "Download",
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "#fff !important",
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function RouterBreadcrumbs(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Route>
        {(location) => {
          const pathnames = location.location.pathname
            .split("/")
            .filter((x) => x);
          return (
            <Breadcrumbs aria-label="breadcrumb" style={{ color: "#fff" }}>
              <LinkRouter to="/" style={{ color: "#fff" }}>
                Home
              </LinkRouter>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return last ? (
                  <Typography key={to}>
                    {breadcrumbNameMap[to]
                      ? breadcrumbNameMap[to]
                      : to.split("/").slice(-1)[0]}
                  </Typography>
                ) : disabledLinks.includes(to) || !breadcrumbNameMap[to] ? (
                  <Typography key={to}>
                    {breadcrumbNameMap[to]
                      ? breadcrumbNameMap[to]
                      : to.split("/").slice(-1)[0]}
                  </Typography>
                ) : (
                  <LinkRouter to={to} key={to} style={{ color: "#fff" }}>
                    {breadcrumbNameMap[to]}
                  </LinkRouter>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </div>
  );
}
