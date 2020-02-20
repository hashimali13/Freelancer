import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function JobPostingProject(props) {
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
      .get("http://localhost:3001/seepost", {
        params: {
          jobid: props.match.params.id
        }
      })
      .then(res => setData(res.data), console.log("up to here"))
      .catch(err => console.log("projectconsole"));
  }, []);

  const showData = props => {
    return data.map(jobposting => {
      console.log(jobposting);
      return (
        <div>
          <Grid container justify="center">
            <Paper
              elevation={3}
              style={{ padding: "50pt", paddingTop: "15px", width: "10%" }}
            >
              <h1>{jobposting.title}</h1>
              <h3>Posted on {new Date(jobposting.postdate).toDateString()}</h3>
              <p>{jobposting.content}</p>
              <p>
                To reference this job, use this code:
                <b>{jobposting.jobid}</b>
              </p>
              <button onClick={goBackHandle}>Go Back</button>
            </Paper>
          </Grid>
        </div>
      );
    });
  };
  return showData(props);
}

export default JobPostingProject;
