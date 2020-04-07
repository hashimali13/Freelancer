//THIS IS TO SHOW POSTS FROM EVERYONE

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
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import JobPostingProject from "./JobPostingProject";

function Projects(props) {
  const [data, setData] = useState([]);
  const history = useHistory();
  let uid = props.location.state.uid;
  console.log(props.location.state.uid)
  useEffect(() => {
    axios
      .get("http://localhost:3001/getproject")
      .then((res) => setData(res.data))
      .catch((err) => console.log("projectconsole"));
  }, []);

  const createTable = (props) => {
    return data.map((project) => {
      console.log(project);
      let id = project.jobid;
      let title = project.title;
      return (
        <TableRow key={project.projectid}>
          <TableCell>{project.jobtype}</TableCell>
          <TableCell>
            <Link to={{ pathname: `/jobpost/${id}`, state: { uid: uid } }}>
              {project.title}
            </Link>
          </TableCell>
          <TableCell>{new Date(project.deadline).toDateString()}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Grid container justify="center">
      <div style={{ width: "50%" }}>
        <Typography
          variant="h3"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#756F6E",
          }}
        >
          {" "}
          All Projects{" "}
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
      </div>
    </Grid>
  );
}

export default Projects;
