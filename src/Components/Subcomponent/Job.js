import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

function Job(props) {
  let user = props.location.state.uid
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
      .get("http://localhost:3001/getjob/:id", {
        params: {
          id: props.match.params.id
        }
      })
      .then(res => setData(res.data), console.log("aa"))
      .catch(err => console.log("projectconsole"));
      
  }, []);

  const showData = props => {
    return data.map(job => {
      console.log(job);
      return (
        <div>
          <Grid container justify="center">
            <Paper
              elevation={3}
              style={{ padding: "50pt", paddingTop: "15px", width: "50%" }}
            >
              <Typography>
                {" "}
                <h1>{job.title}</h1>
                <h3>
                  Posted on {new Date(job.postdate).toDateString()}
                </h3>
                <h3>
                  Deadline: {new Date(job.deadline).toDateString()}
                </h3>
                <p>{job.deliverables}</p>
                <p>
                  To reference this job, use this code:
                  <b>{job.projectid}</b>
                </p>
                
              </Typography>
              {user ===job.uid ?
                <Button
                  variant="contained"
                  color="primary"
                  style={{marginRight:"5px"}}
                  onClick={() =>
                    props.history.push({
                      pathname: `/editpost/${job.uid}`,
                      state: {
                        jobid: job.jobid
                      }
                    })
                  }
                >
                  Edit Post
                </Button>
              :
                <br/>
              } 
              <Button
                variant="contained"
                color="primary"
                onClick={goBackHandle}
              >
                Go Back
              </Button>
            </Paper>
          </Grid>
        </div>
      );
    });
  };
  return showData(props);
}

export default Job;
