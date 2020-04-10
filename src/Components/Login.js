import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Dialog from "./Dialog";
import { render } from "@testing-library/react";
import Paper from "@material-ui/core/Paper";
import { useParams, useHistory } from "react-router";


const Login = props => {
  const [username, setUser] = useState();
  const [password, setPass] = useState();
  const history = useHistory();

  useEffect(() => {
    console.log(props.user)
     let test = props.user
  });

  const HandleUser = event => {
    setUser(event.target.value);
  };

  const HandlePass = event => {
    setPass(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .get("http://localhost:3001/authuser", {
        params: {
          user: username,
          pass: password
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data[0].profilepicture);
          console.log(res.data);
          props.user(res.data[0].username)
          props.uid(res.data[0].uid)
          history.push({
            pathname: "/dashboard",
            state: {
              user: res.data[0].username,
              photo: res.data[0].profilepicture,
              uid: res.data[0].uid
            }
          });
        }
      })
      .catch(error => {
        console.log("sdsd");
        render(
          <Dialog
            header="Login error"
            body="Invalid username or password. Please try again."
          />
        );
      });
  };

  return (
    <Grid container justify="center">
      <Paper elevation={3} style={{ padding: "50pt", paddingTop: "15px" }}>
        <form onSubmit={handleSubmit}>
          <Typography style={{ color: "#black" }} variant="h5" gutterBottom>
            Enter user details
          </Typography>
          <TextField label="Username" onChange={HandleUser} />
          <br></br>
          <br></br>
          <TextField label="Password" type="password" onChange={HandlePass} />
          <br></br>
          <br></br>
          <Button variant="contained" type="submit" color="primary">
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push({ pathname: "/register" })}
            style={{ marginLeft: "5px" }}
            color="primary"
          >
            Register
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;

