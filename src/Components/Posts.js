import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { typography } from "@material-ui/system";
import Clock from "./Clock";
import RecentProjects from "./Subcomponent/MyPosts";
import { TextareaAutosize } from "@material-ui/core";

function Posts(props) {
  let uid = props.match.params.id;
  console.log(uid);
  console.log(props);
  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    },
    leftColumn: {
      order: 0
    },
    rightColumn: {
      order: 1,
      flexGrow: 2
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Grid container justify="center">
          <Paper
            elevation={3}
            style={{ padding: "50pt", paddingTop: "15px", width: "50%" }}
          >
            <Grid container spacing={1} direction="column" alignItems="center">
              <Grid item>
                <div
                  style={{ width: "100%", height: "0%", textAlign: "center" }}
                >
                  <Typography> Projects </Typography>
                  <p>
                    Welcome to your projects page!
                    <br />
                    From here you can create, edit or delete your posts and view
                    all posts from other users.
                  </p>
                </div>
              </Grid>
              <Grid item>
                {/* This grid item is for making posts */}
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: `/makepost/${uid}`,
                        state: {
                          user: props.location.state.user
                        }
                      })
                    }
                  >
                    Create a post
                  </Typography>
                </Paper>
              </Grid>
              {/* <Grid item>
                // This grid item is for making posts -------------------------------------------------------------------------------------------
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: `/editpost/${uid}`,
                        state: {
                          jobid: props.location.state.jobid
                        }
                      })
                    }
                  >
                    Edit a post
                  </Typography>
                </Paper>
              </Grid> */}
              <hr />
              <Grid item>
                {/* This is for Projects the user is working on */}
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: "/myprojects",
                        state: {
                          user: props.location.state.user
                        }
                      })
                    }
                  >
                    My Jobs: <br /> Projects that you are working on!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                {/* This is for the user to view projects that they have posted */}
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({ pathname: "/projects" })
                    }
                  >
                    My Projects: All the projects you have posted!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                {/* This is for the user to view projects from all users */}
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({ pathname: "/projects" })
                    }
                  >
                    Browse All Jobs: <br /> View all projects!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default Posts;
