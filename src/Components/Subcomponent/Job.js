import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Files from "./Files"

function Job(props) {
  let user = props.location.state.uid;
  const [poster, setPoster] = useState();
  const [data, setData] = useState([]);
  const history = useHistory();
  console.log(props);
  function goBackHandle() {
    history.goBack();
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/getjob/:id", {
        params: {
          id: props.match.params.id,
        },
      })
      .then((res) => setData(res.data), console.log("aa"))
      .catch((err) => console.log("projectconsole"));
  }, []);

  const showData = (props) => {
    return data.map((job) => {
      console.log(job);
      return (
        <Container>
          <Grid container justify="center">
            <Grid style={{ width: "70%" }} item>
              <Paper
                elevation={3}
                style={{ padding: "50pt", paddingTop: "15px" }}
              >
                <Typography>
                  {" "}
                  <h1>{job.title}</h1>
                  <h3>Freelancer: {props.location.state.user}</h3>
                  <h5>Posted: {new Date(job.postdate).toDateString()}</h5>
                  <h5>Deadline: {new Date(job.deadline).toDateString()}</h5>
                  <p>{job.deliverables}</p>
                  <p>
                    Job reference:
                    <b>{job.projectid}</b>
                  </p>
                </Typography>
                {user === job.uid ? (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "5px", backgroundColor:"purple", color:"white" }}
                    onClick={() =>
                      props.history.push({
                        pathname: `/editpost/${job.uid}`,
                        state: {
                          jobid: job.jobid,
                          uid: job.uid,
                        },
                      })
                    }
                  >
                    Edit Post
                  </Button>
                ) : (
                  <br />
                )}
                <Button
                  onClick={() =>
                    props.history.push({
                      pathname: `/fileupload`,
                      state: {
                        user: props.location.state.user,
                        jobid: job.projectid,
                        uid: props.location.state.uid,
                      },
                    })
                  }
                  variant="contained"
                  style={{ marginRight: "5px", backgroundColor:"green", color:"white" }}
                >
                  Upload file
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={goBackHandle}
                >
                  Go Back
                </Button>
              </Paper>
                  <br></br>
            </Grid>
            <Grid style={{ width: "70%" }} item>
                <Files projectid={job.projectid}></Files>
            </Grid>

            <Grid style={{ width: "70%" }} item>
              <h1>temp</h1>
            </Grid>
          </Grid>
        </Container>
      );
    });
  };
  return showData(props);
}

export default Job;
