import React, { useState, useEffect } from 'react';
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
import MyPosts from "./Subcomponent/MyPosts";
import MyProjects from "./Subcomponent/Dashprojects";
import { TextareaAutosize } from "@material-ui/core";

function Dashboard(props) {
  let uid = props.location.state.uid;
  console.log(uid);
  console.log(props);

  useEffect(() => {
    console.log("look here")
    if(props.location.state.uid===undefined){
      console.log("UNDEFINED")
      props.history.push({ pathname: `/` })
    }
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    leftColumn: {
      order: 0,
    },
    rightColumn: {
      order: 1,
      flexGrow: 2,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.rightColumn}>
        {/* <MyPosts user={props.location.state.user} uid={uid}></MyPosts> */}
        <MyProjects user={props.location.state.user} uid={uid}></MyProjects>
      </Paper>
      <div className={classes.leftColumn}>
        <Grid container justify="center">
          <Paper
            elevation={3}
            style={{ padding: "50pt", paddingTop: "15px", width: "25%" }}
          >
            <Grid container spacing={1} direction="column" alignItems="center">
              <Grid item>
                <div
                  style={{ width: "100%", height: "0%", textAlign: "center" }}
                >
                  <Typography> Hello {props.location.state.user} </Typography>
                  <Clock></Clock>
                  <img
                    src={props.location.state.photo}
                    style={{ width: "40%" }}
                  ></img>
                </div>
              </Grid>
              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({ pathname: `/profile/${uid}` })
                    }
                  >
                    Profile
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: `/posts/${uid}`,
                        state: {
                          user: props.location.state.user,
                          uid: props.location.state.uid,
                        },
                      })
                    }
                  >
                    Posts
                  </Typography>
                </Paper>
              </Grid>
              <Grid item></Grid>
              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({ pathname: "/newsfeed" })
                    }
                  >
                    News Feed
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: "/editprofile",
                        state: {
                          user: props.location.state.user,
                          photo: props.location.state.photo,
                          uid: uid,
                        },
                      })
                    }
                  >
                    Edit Profile
                  </Typography>
                </Paper>
              </Grid>

              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: `/messages/${uid}`,
                        state: { user: props.location.state.uid },
                      })
                    }
                  >
                    Messages
                  </Typography>
                </Paper>
              </Grid>

              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: `/friends/${uid}`,
                        state: { user: props.location.state.uid, username:props.location.state.user },
                      })
                    }
                  >
                    Friends
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Typography
                    onClick={() =>
                      props.history.push({
                        pathname: "/search",
                        state: {
                          user: props.location.state.user,
                          uid: props.location.state.uid,
                        },
                      })
                    }
                  >
                    Search
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

export default Dashboard;
