import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import { Avatar, TableBody } from "@material-ui/core";

function Application (props) {
    const [data, setData] = useState([]);
    const history = useHistory();
    const  [commentCount,setCount] = useState();;

    useEffect(() => {
        axios
        .get("http://localhost:3001/getfiles/:id", {
            params: {
                id: props.projectid
            }
        })
        .then(res => {
             setData(res.data)
             setCount(res.data.length)
        }
            
        )
        .catch(err =>
            console.log("You got so far but in the end it just didn't matter")
        );
    }, []);




    const getFiles = props =>{
        return data.map(file => {
            let link = file.location
            console.log(link)
            return (
              <Grid  item  key={file.fileid} item>
                <a rel="noopener noreferrer" target="_blank" href={link} style={{textDecoration:"none"}}> 
                <Paper style={{height:"100px", width:"100px", textAlign:"center", verticalAlign:"middle", marginBottom:"5px"}}>
                    <Typography > {file.title}</Typography>
                </Paper>
                </a>
                <Button style={{height:"30px", width:"100px",textTransform:"none", backgroundColor:"darkred", color:"white"}}>
                    <Typography>Delete </Typography>
                </Button>
              </Grid>
            );
          });
    };


    return(
         <Paper style={{padding:"10px 10px 10px 10px"}} onClick={console.log(5)} >
              <Typography > <h3 style={{paddingLeft:"10px"}}>Files</h3> </Typography>
            <Grid container spacing={2} > 
                {getFiles()}
            </Grid>
        </Paper>
        
    )

}

export default Application;