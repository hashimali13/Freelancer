import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Dialog from "./../Dialog";
import Paper from "@material-ui/core/Paper";

const EditProfile = (props) => {
    const [username, setUser] = useState();
    const [password, setPass] = useState();
    const[newPass, setNewPass] =useState();

    useEffect(() => {
        setUser(props.location.state.user);
      }, []);
    
    const HandlePass = event => {
      setPass(event.target.value);
    };
    const HandleNewPass = event => {
        setNewPass(event.target.value);
      };

      const HandleSubmit = event => {
        props.history.push({
            pathname: "/dashboard",
            state: {
              user: username
            }
          });
      };


  return (
    <Grid container justify="center">
      <Paper elevation={3}  style={{ padding: "50pt", paddingTop: "15px", width:"40%" }}>
      <Typography
          variant="h4"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#756F6E"
          }}
        > Edit Profile
        </Typography>
        <form  alignItems="center" onSubmit={HandleSubmit} style={{  textAlign: "center"}}>
          
          <Typography >{username} </Typography>
        
          <TextField label="New Password" type="password" onChange={HandlePass} style={{marginRight:"5px"}}/>
          <TextField label="Confirm password" type="password" onChange={HandleNewPass} />
          <br></br>
          <br></br>
          <Button variant="contained" type="submit" color="primary">
            Edit Profile
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default EditProfile;

