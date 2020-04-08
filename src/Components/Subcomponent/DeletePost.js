import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Comment from "./Comment";
import Container from "@material-ui/core/Container";

function DeletePost(props) {
  let jobid = props.location.state.jobid;
  const history = useHistory();

  const handleNo = () => {
    history.goBack();
  };

  const handleYes = (props) => {
    axios
      .post("http://localhost:3001/deletepost", {
        jobid: jobid,
      })
      .then((res) => {
        console.log(res.status);
        console.log("just to check 2");
        props.history.push({
          pathname: "/myposts",
          state: {
            user: props.location.state.user,
            jobid: props.location.state.jobid,
            uid: props.location.state.uid,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(
          "Deleted the job post but catches the error anyway?? im confused"
        );
      });
  };

  return (
    <Container>
      <Grid container spacing={3} justify="center">
        <Grid style={{ width: "70%" }} item>
          <Paper elevation={3} style={{ padding: "50pt", paddingTop: "15px" }}>
            <Typography>
              <h1>Delete post?</h1>
              <p>
                You are about to delete this post, the results are permanent and
                cannot be reversed
              </p>
            </Typography>
            <Button onClick={handleNo} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={handleYes} variant="contained" color="primary">
              Delete
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DeletePost;
