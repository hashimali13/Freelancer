import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';

import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function CreateApplication (props) {
    const [data, setData] = useState([]);
    const [content, setContent] = useState();
    const [cv, setCv] = useState();

    const jobid = props.location.state.jobid
    const uid = props.location.state.uid
    const user = props.location.state.user
    console.log(user, uid, jobid)
    const history = useHistory();

    const handleContent = event => {
        setContent(event.target.value)
    }

    const handleCv = event => {
        setCv(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log("aaa")
        axios.post('/createapplication', {
            uid: uid,
            username: user,
            cv: cv,
            content: content,
            jobid, jobid
          })
          .then(function (response) {
            history.goBack()
          })
          .catch(function (error) {
            console.log(error);
          });
    }



    return(

        <Grid container justify="center">
        <Paper elevation={3} style={{ padding: "50pt", paddingTop: "15px", width:"30%" }}>
        <form fullWidth="true" size="medium" onSubmit={handleSubmit}>
          <Typography style={{ color: "#black" }} variant="h5" gutterBottom>
            Create Application
          </Typography>
          <TextField fullWidth="true" multiline rowsMax="4" label="Content" onChange={handleContent} />
          <br></br>
          <br></br>
          <TextField fullWidth="true" multiline rowsMax="4" label="CV" onChange={handleCv} />
          <br></br>
          <br></br>  
          <div>

              <Button onClick={()=> history.goBack()} variant="contained"  color="primary" style={{marginRight:"5px"}}>
            Go back
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Send application
          </Button>
          </div>
          
        </form >
      </Paper>
    </Grid>
        
        
    )

}
export default CreateApplication;
