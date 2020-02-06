import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import Register from "./Components/Register";
import AllProjects from "./Components/AllProjects";
import Projects from "./Components/Projects";
import Newsfeed from "./Components/Newsfeed";
import JobPostingProject from "./Components/JobPostingProject";
import AppBarDrawer from "./Components/AppBarDrawer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "grey",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    textAlign: "center"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div>
      <AppBarDrawer></AppBarDrawer>
      <br></br>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={Register} />
      <Route path="/projects" component={Projects} />
      <Route path="/newsfeed" component={Newsfeed} />
      <Route path="/myprojects" component={AllProjects} />
      <Route path="/projects/:JPId" component={JobPostingProject} />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Footer placeholder</Typography>
        </Container>
      </footer>
    </div>
  );
}

export default App;