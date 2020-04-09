import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeletePost from "./DeletePost";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Application from "./Application";
import Comment from "./Comment";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

function JobPostingProject(props) {
  console.log(props.location.state.uid);
  console.log(props.match.params.id);
  let user = props.location.state.uid;
  const [poster, setPoster] = useState();
  let { id } = useParams();
  let jid = { id };
  const [data, setData] = useState([]);
  const history = useHistory();
  console.log(props);

  function goBackHandle() {
    history.goBack();
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/getpost", {
        params: {
          id: props.match.params.id,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("uid: " + res.data[0].uid);
        axios
          .get("/userid/:id", {
            params: {
              id: res.data[0].uid,
            },
          })
          .then((res) => {
            setPoster(res.data[0].username);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log("projectconsole"));
  }, []);

  const handleDelete = (jobid) => {
    let uid = props.location.state.uid;
    console.log(props);
    console.log(jobid);
    axios
      .post("http://localhost:3001/deletepost", {
        id: jobid,
      })
      .then((res) => {
        console.log(res.status);
        props.history.push({
          pathname: "/myposts",
          state: {
            user: props.location.state.user,
            jobid: props.location.state.jobid,
            uid: uid,
          },
        });
      })
      .catch((error) => {
        console.log("error 12345678");
      });
  };

  const showData = (props) => {
    return data.map((jobposting) => {
      console.log(jobposting);
      return (
        <Container>
          <Grid key={jobposting.jobid} container spacing={3} justify="center">
            <Grid style={{ width: "70%" }} item>
              <Paper
                elevation={3}
                style={{ padding: "50pt", paddingTop: "15px" }}
              >
                <Typography component={'span'}>
                  {" "}
                  <h1>{jobposting.title}</h1>
                  <h3>
                    Posted on {new Date(jobposting.postdate).toDateString()}
                  </h3>
                  <h4>
                  By
                    <Link
                      style={{ textDecoration: "none" }}
                      to={{
                        pathname: `/profile/${jobposting.uid}`,
                        state: { uid: jobposting.uid },
                      }}
                    >
                      {" "}
                       {poster}
                    </Link>
                  </h4>
                  <p>
                    Job type:
                    {jobposting.jobtype}
                  </p>
                  <p>{jobposting.content}</p>
                  <p>
                    To reference this job, use this code:
                    <b>{jobposting.jobid}</b>
                  </p>
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "5px" }}
                  onClick={goBackHandle}
                >
                  Go Back
                </Button>

                {/* {user === jobposting.uid ? */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    props.history.push({
                      pathname: `/editpost/${jobposting.uid}`,
                      state: {
                        jobid: jobposting.jobid,
                        uid: jobposting.uid,
                        user: props.location.state.user,
                      },
                    })
                  }
                >
                  Edit Post
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    props.history.push({
                      pathname: "/deletepost",
                      state: {
                        jobid: jobposting.jobid,
                        uid: jobposting.uid,
                        user: props.location.state.user,
                      },
                    })
                  }
                >
                  Delete
                </Button>
                {/* :
                <br/>
              }  */}
                <Button
                  onClick={()=>{
                    props.history.push({
                      pathname: `/createapplication`,
                      state: {
                        jobid: jobposting.jobid,
                        uid: props.location.state.uid,
                        user: props.location.state.user,
                      },
                    })
                  }}
                variant="contained" color="primary">
                  Send Application
                </Button>
              </Paper>
            </Grid>

            <Grid style={{ width: "70%" }} item>
              <Paper
                elevation={3}
                style={{
                  padding: "50pt",
                  paddingTop: "15px",
                }}
              >
                <Typography component={'span'}>
                  <h2> Applications </h2>
                </Typography>
                <Application
                  uid={user}
                  postingId={jobposting.jobid}
                  appid={props.match.params.id}
                ></Application>
              </Paper>
            </Grid>

            <Grid style={{ width: "70%" }} item>
              <Paper
                elevation={3}
                style={{
                  padding: "50pt",
                  paddingTop: "15px",
                }}
              >
                <Comment user={props.location.state.user} uid={props.location.state.uid} commentid={props.match.params.id}></Comment>

              </Paper>
            </Grid>
          </Grid>
        </Container>
      );
    });
  };
  return showData(props);
}

export default JobPostingProject;
