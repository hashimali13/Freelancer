import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Dialog from "./../Dialog";
import Paper from "@material-ui/core/Paper";

const EditProfile = (props) => {
    const [username, setUserName] = useState();
    const [password, setPass] = useState();
    const[newPass, setNewPass] =useState();
    const[email, setEmail] =useState();
    const[desc, setDesc] =useState();
    const[location, setLocation] =useState();
    const[industry, setIndustry] =useState();
    const[first, setFirst] =useState();
    const[last, setLast] =useState();

    useEffect(() => {
        setUserName(props.location.state.user);

      }, []);
    
    const HandlePass = event => {
      setPass(event.target.value);
    };
    const HandleNewPass = event => {
        setNewPass(event.target.value);
      };

      const HandleNewEmail = event => {
        setEmail(event.target.value);
      };

      const HandleNewDesc = event => {
        setDesc(event.target.value);
      };

      const HandleNewLocation = event => {
        setLocation(event.target.value);
      };

      const HandlenewIndustry = event => {
        setIndustry(event.target.value);
      };

      const HandleFirst = event => {
        setFirst(event.target.value);
      };

      const HandleLast = event => {
        setLast(event.target.value);
      };

      const HandleSubmit = event => {
        if(password===newPass){console.log("adas")}
        
        props.history.push({
            pathname: "/dashboard",
            state: {
              user: username,
              photo:props.location.state.photo
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
          <TextField label="Edit Email" type="text" onChange={HandleNewEmail} />
          <br></br>
          <br></br>
          <TextField style={{width:"50%"}} multiline rowsMax="4" label="Edit Description" type="text" onChange={HandleNewDesc} />
          <br></br>
          <br></br>
          <TextField label="Edit Location" type="text" style={{marginRight:"5px"}} onChange={HandleNewLocation} />
          
          <TextField label="Edit Industry" type="text" onChange={HandlenewIndustry} />
          <br></br>
          <br></br>
          <TextField label="First name" style={{marginRight:"5px"}} type="text" onChange={HandleFirst} />
          
          <TextField label="Last name" type="text" onChange={HandleLast} />
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

