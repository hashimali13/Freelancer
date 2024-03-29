import React, { useState } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import Register from "./Components/Register";
import AllProjects from "./Components/Subcomponent/MyJobs";
import Projects from "./Components/Subcomponent/Projects";
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
import MyJobs from "./Components/Subcomponent/MyJobs";
import MyPosts from "./Components/Subcomponent/MyPosts";
import Job from "./Components/Subcomponent/Job";
import DeletePost from "./Components/Subcomponent/DeletePost";
import CreateApplication from "./Components/Subcomponent/CreateApplication";
import FileUpload from "./Components/Subcomponent/FileUpload";
import MyJobPostings from "./Components/Subcomponent/MyJobPostings";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function App() {
  const classes = useStyles();
  const [username, setUser] = useState();
  const [uid, setUid] = useState();

  const handleUser = (passedUser) => {
    setUser(passedUser);
  };

  const handleUid = (passedUid) => {
    setUid(passedUid);
  };

  return (
    <div>
      <AppBarDrawer
        setUid={setUid}
        setUser={setUser}
        uid={uid}
        user={username}
      ></AppBarDrawer>
      <br></br>
      <Route
        exact
        path="/"
        render={(props) => <Login user={handleUser} uid={handleUid} />}
      />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={Register} />
      <Route exact path="/projects" component={Projects} />
      <Route path="/myprojects/" component={MyJobs} />
      <Route path="/jobpost/:id" component={JobPostingProject} />
      <Route path="/job/:id" component={Job} />
      <Route path="/editprofile" component={EditProfile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/messages" component={Messages} />
      <Route path="/makepost" component={MakePost} />
      <Route path="/sendmessage/:id" component={ComposeMessage} />
      <Route path="/posts/:id" component={Posts} />
      <Route path="/editpost/:id" component={EditPost} />
      <Route path="/friends" component={Friends} />
      <Route path="/myposts" component={MyPosts} />
      <Route path="/myjobpostings" component={MyJobPostings} />
      <Route path="/deletepost" component={DeletePost} />
      <Route path="/createapplication" component={CreateApplication} />
      <Route path="/fileupload" component={FileUpload} />
    </div>
  );
}

export default App;
