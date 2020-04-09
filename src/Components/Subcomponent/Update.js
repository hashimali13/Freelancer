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
import { Avatar } from "@material-ui/core";

function Application (props) {
    let commentid = props.commentid
    const [data, setData] = useState([]);
    const [newComm, setComm] = useState();
    const history = useHistory();
    const  [commentCount,setCount] = useState();;
    useEffect(() => {
        axios
        .get("http://localhost:3001/getupdates/:id", {
            params: {
                id: commentid
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

    const handleContent = event =>{
        setComm(event.target.value)
    }

    const handleSubmit = event =>{
        
        event.preventDefault();
        axios.post('/createupdate', {
            uid: props.uid,
            date: new Date().toLocaleString(),
            cid: commentid,
            comment: newComm
          })
          .then(function (response) {
              console.log("success")
              window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getComments = props =>{
        return data.map(comment => {
            let first = comment.firstname.charAt(0)
            let last = comment.lastname.charAt(0)
            let dateTemp = comment.date.toString()
            let date = new Date(dateTemp)
            return (
              <TableRow  key={comment.cid}>
                <TableCell>
                    <Link style={{textDecoration:"none"}} to={{ pathname: `/profile/${comment.uid}`, state: { uid: comment.uid } }}>  
                        <Avatar > {first + last}</Avatar> 
                    </Link> 
                </TableCell>
                <TableCell>{comment.username}</TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.location}</TableCell>
                <TableCell>{date.getDate() +"/" +date.getMonth() +"/" + date.getFullYear()}</TableCell>
              </TableRow>
            );
          });
    };


    return(

        <div>
            <Typography>
                  <h2> {commentCount} Comments </h2>
                </Typography>
            <form fullWidth="true" size="medium" onSubmit={handleSubmit}>
           
            <TextField fullWidth="true" multiline rowsMax="4" label="Enter comment" onChange={handleContent} />
            <br></br>
            <br></br>
            <div>
            <Button variant="contained" type="submit" color="primary">
                Send Comment
            </Button>
            <br></br>
            <br></br>
            </div>
        </form >

        </div>
        
        
    )

}

export default Application;