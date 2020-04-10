import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Dialog from "../Dialog"
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@material-ui/core";
import { render } from "@testing-library/react";

function Application (props) {
    let commentid = props.updateid
    const [data, setData] = useState([]);
    const [newComm, setComm] = useState();
    const history = useHistory();
    const  [commentCount,setCount] = useState();;
    useEffect(() => {
        console.log(props.updateid)
        axios
        .get("http://localhost:3001/getupdates/:id", {
            params: {
                id: props.updateid
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
        console.log(newComm)
    }

    const handleSubmit = event =>{
        event.preventDefault();
        axios.post('/createUpdate', {
            uid: props.uid,
            date: new Date().toLocaleString(),
            jid: props.updateid,
            content: newComm
          })
          .then(function (response) {
              console.log("success")
              window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getUpdates = props =>{
        return data.map(comment => {
            
            let first = comment.firstname.charAt(0)
            let last = comment.lastname.charAt(0)
 
            return (
              <TableRow  key={comment.cid}>
                <TableCell>
                    <Link style={{textDecoration:"none"}} to={{ pathname: `/profile/${comment.uid}`, state: { uid: comment.uid } }}>  
                        <Avatar > {first + last}</Avatar> 
                    </Link> 
                </TableCell>
                <TableCell>{comment.content}</TableCell>
              </TableRow>
            );
          });
    };


    return(

        <div>
            <Typography>
                  <h2> {commentCount} Updates </h2>
                </Typography>
            <form fullwidth="true" size="medium" onSubmit={handleSubmit}>
           
            <TextField  style={{width:"100%"}} multiline rowsMax="4" label="Enter comment" onChange={handleContent} />
            <br></br>
            <br></br>
            <div>
            <Button variant="contained" type="submit" color="primary">
                Send Update
            </Button>
            <br></br>
            <br></br>
            </div>
        </form >
        <Table>
            <TableBody>
                {getUpdates()}
            </TableBody>
            
        </Table>
            
        </div>
        
        
    )

}

export default Application;