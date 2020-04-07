import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeletePost from "./DeletePost";
import Paper from "@material-ui/core/Paper";
import Application from "./Application";
import Comment from "./Comment";

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
      .then((res) => setData(res.data), console.log("aa"))
      .catch((err) => console.log("projectconsole"));
  }, []);

  const showData = (props) => {
    return data.map((jobposting) => {
      console.log(jobposting);
      return (
        <div>
          <Grid style={{ width: "90%" }} container spacing={3} justify="center">
            <Grid item>
              <Paper
                elevation={3}
                style={{ padding: "50pt", paddingTop: "15px" }}
              >
                <Typography>
                  {" "}
                  <h1>{jobposting.title}</h1>
                  <h3>
                    Posted on {new Date(jobposting.postdate).toDateString()}
                  </h3>
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
                      },
                    })
                  }
                >
                  Edit Post
                </Button>
                {/* :
                <br/>
              }  */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "5px" }}
                  onCLick={() => <DeletePost />}
                >
                  Delete
                </Button>

                <Button variant="contained" color="primary">Send Application</Button>
              </Paper>
            </Grid>

            <Grid item>
              <Paper
                elevation={3}
                style={{
                  padding: "50pt",
                  paddingTop: "15px",
                 
                }}
              >
                <Typography>
                  <h2> Applications </h2>
                </Typography>
                <Application appid={props.match.params.id}></Application>
              </Paper>
            </Grid>

            <Grid item>
              <Paper
                elevation={3}
                style={{
                  padding: "50pt",
                  paddingTop: "15px",
                 
                }}
              >
                <Typography>
                  <h2> Comments </h2>
                </Typography>
                <Comment commentid={props.match.params.id}></Comment>

              </Paper>
            </Grid>
            
          </Grid>
        </div>
      );
    });
  };
  return showData(props);
}

export default JobPostingProject;
