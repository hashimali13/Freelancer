import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";


function FileUpload (props) {
    const [file, setFile] = useState();
    const [filename, setName] = useState();
    const [uploaded, setUploaded] = useState("None");



    const history = useHistory();

    useEffect(() => {
        
        console.log( props.location.state.user,
            props.match.params.jobid,
            props.location.state.uid)
    }, []);

    const handleName = event =>{
        setName(event.target.value)
    }

    const handleFile = event =>{
        setFile(event.target.files[0])
        console.log(event.target.files)
        setUploaded(event.target.files[0].name)
    }

    const handleSubmit = event =>{
        event.preventDefault();
        var form = new FormData();
        form.append("profile",file)
        axios.post('/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    return(
            <Grid container direction="column" alignItems="center" justify="center" >
                <Grid item >
                    <Paper style={{height:"35vh", width:"80vh"}} >
                        <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
                            <Typography style={{paddingTop:"10px"}} ><h2>File Upload</h2></Typography> 
                            <Typography><h4>{uploaded} selected</h4></Typography> 

                            <TextField label="Choose file name" onChange={handleName} />
                            <br></br>
                            <br></br>
                            <Button style={{marginRight:"5px"}} variant="contained" component="label" >
                                Upload file
                                <input style={{ display: "none" }} onChange={handleFile} type="file"/>
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Submit
                            </Button>
                        </form>
                        
                    </Paper>
                </Grid>   
            </Grid> 
        
    )

}
export default FileUpload;
