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

function Projects(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getproject")
      .then(res => setData(res.data))
      .catch(err => console.log("Gottem good"));
  }, []);

  const createTable = () => {
    return data.map(project => {
      return (
        <TableRow key={project.projectid}>
          <TableCell>{project.jobtype}</TableCell>
          <TableCell>{project.title}</TableCell>
          <TableCell>{project.deadline}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Grid container justify="center" >
      <div style={{width:"50%"}}>
        <Typography variant="h3" style={{textAlign:"center", marginBottom:"20px", color:"#756F6E"}}> Projects </Typography>
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
