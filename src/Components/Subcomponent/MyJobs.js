//THIS IS FOR PROJECTS THAT THE USER IS WORKING ON/COMPLETING

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import JobPostingProject from "./JobPostingProject";
import Button from "@material-ui/core/Button";

function MyJobs(props) {
  const [data, setData] = useState([]);
  const history = useHistory();

  function goBackHandle() {
    history.goBack();
  }

  useEffect(() => {
    console.log(props.location.state.user)
    console.log(props.location.state.uid)
    axios
      .get("http://localhost:3001/searchproject", {
        params: {
          user: props.location.state.user,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log("projectconsole"));
  }, []);

  const createTable = () => {
    return data.map((project) => {
      console.log(project);
      let id = project.projectid;
      return (
        <TableRow key={project.projectid}>
          <TableCell>{project.jobtype}</TableCell>
          <TableCell>
            <Link
              to={{
                pathname: `/job/${id}`,
                state: { uid: props.location.state.uid, user:props.location.state.user },
              }}
            >
              {project.title}
            </Link>
          </TableCell>
          <TableCell>{new Date(project.deadline).toDateString()}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div>
      <Grid container justify="center">
        <div style={{ width: "50%", marginBottom: "20px" }}>
          <Typography
            variant="h3"
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#756F6E",
            }}
          >
            My Jobs!
          </Typography>
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#756F6E",
            }}
          >
            This is where you can find the projects you are working on
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job type</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Deadline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{createTable()}</TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={goBackHandle}
          >
            Go Back
          </Button>
        </div>
      </Grid>
    </div>
  );
}

export default MyJobs;
