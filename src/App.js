import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import Register from "./Components/Register";
import AllProjects from "./Components/Subcomponent/MyProjects";
import Projects from "./Components/Subcomponent/Projects";
import Newsfeed from "./Components/Newsfeed";
import JobPostingProject from "./Components/Subcomponent/JobPostingProject";
import AppBarDrawer from "./Components/AppBarDrawer";
import Profile from "./Components/Profile";
import EditProfile from "./Components/Subcomponent/EditProfile";
import Messages from "./Components/Messages";
import MakePost from "./Components/Subcomponent/MakePost";
import ComposeMessage from "./Components/Subcomponent/ComposeMessage";
import Posts from "./Components/Posts";
import EditPost from "./Components/Subcomponent/EditPost";
import Friends from "./Components/Friends";
import MyProjects from "./Components/Subcomponent/MyProjects";
import MyPosts from "./Components/Subcomponent/MyPosts";

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
    padding: theme.spacing(2, 2),
    marginTop: "auto",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#3f50b5",
    color: "white"
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
      <Route exact path="/projects" component={Projects} />
      <Route path="/newsfeed" component={Newsfeed} />
      <Route path="/myprojects/:id" component={MyProjects} />
      <Route path="/projects/:id" component={JobPostingProject} />
      <Route path="/editprofile" component={EditProfile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/messages" component={Messages} />
      <Route path="/makepost/:id/" component={MakePost} />
      <Route path="/sendmessage/:id" component={ComposeMessage} />
      <Route path="/posts/:id" component={Posts} />
      <Route path="/editpost/:id" component={EditPost} />
      <Route path="/friends" component={Friends} />
      <Route path="/myposts/:id" component={MyPosts} />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography>Footer placeholder</Typography>
        </Container>
      </footer>
    </div>
  );
}

export default App;
