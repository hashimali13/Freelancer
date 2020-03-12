import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import Dialog from "./Dialog";
import { render } from "@testing-library/react";
import Paper from "@material-ui/core/Paper";
import { useParams, useHistory } from "react-router";

function MakePost(props) {
  console.log(props);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [jobtype, setJobtype] = useState([]);
  const [uid, setUid] = useState([]);
  const [postDate, setPostDate] = React.useState("2020-03-12");
  const [deadlineDate, setDeadlineDate] = React.useState("2020-03-12");
  const history = useHistory();

  function goBackHandle() {
    history.goBack();
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/makepost/:id", {
        title: title,
        content: content,
        pd: postDate,
        dd: deadlineDate,
        jobtype: jobtype,
        uid: props.match.params.id
      })
      .then(res => {
        console.log("hello");
        if (res.status === 201) {
          props.history.push({
            pathname: "/myprojects"
          });
        }
      })
      .catch(error => {
        console.log(error);
        render(
          <Dialog
            header="Error making post"
            body="Unable to create a post. Check the information given and please try again."
          />
        );
      });
  };

  const HandleTitle = event => {
    setTitle(event.target.value);
  };
  const HandleContent = event => {
    setContent(event.target.value);
  };
  const HandleJT = event => {
    setJobtype(event.target.value);
  };
  const HandleUid = event => {
    setUid();
    //need to pass the id into here somehow
    //might not even be needed
  };
  const HandlePDate = event => {
    setPostDate(event.target.value);
  };
  const HandleDDate = event => {
    setDeadlineDate(event.target.value);
  };

  return (
    <div className="message-box">
      <Grid constainer justify="center">
        <Paper elevation={3} style={{ padding: "50pt", paddingTop: "15px" }}>
          <form onSubmit={handleSubmit}>
            <Typography style={{ color: "#black" }} variant="h5" gutterBottom>
              Posting!
            </Typography>
            <TextField label="Title" onChange={HandleTitle} />
            <br></br>
            <br></br>
            <TextField label="JobType" onChange={HandleJT} />
            <br></br>
            <br></br>
            <TextField label="Content" onChange={HandleContent} />
            <br></br>
            <br></br>
            <TextField
              id="pdate"
              style={{ width: "100%" }}
              onChange={HandlePDate}
              label="Post Date"
              type="date"
              defaultValue="2020-03-12"
              InputLabelProps={{
                shrink: true
              }}
            />
            <br></br>
            <br></br>
            <TextField
              id="ddate"
              style={{ width: "100%" }}
              onChange={HandleDDate}
              label="Deadline Date"
              type="date"
              defaultValue="2020-03-12"
              InputLabelProps={{
                shirnk: true
              }}
            />
            <br></br>
            <br></br>
            <Button variant="contained" type="submit" color="primary">
              Create Post
            </Button>
          </form>
        </Paper>
      </Grid>

      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        justifyContent="center"
        onClick={goBackHandle}
      >
        Go Back
      </Button>
    </div>
  );
}

export default MakePost;
