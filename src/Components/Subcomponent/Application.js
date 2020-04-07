import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";


import TableRow from "@material-ui/core/TableRow";

function Application (props) {
    let appid = props.appid
    const [data, setData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios
        .get("http://localhost:3001/getapplication/:id", {
            params: {
                id: appid
            }
        })
        .then(res => {
             setData(res.data)
        }
            
        )
        .catch(err =>
            console.log("You got so far but in the end it just didn't matter")
        );
    }, []);

    const handleAccept = props =>{
        console.log("accept")
    }

    const handleReject = appid =>{
        console.log(appid)
        axios.post('/deleteapplication', {
            id: appid        
          })
          .then(function (res) {
            console.log(res);
            window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getComments = props =>{
        return data.map(comment => {
            return (
              <TableRow key={comment.appid}>
                <TableCell>{comment.appid}</TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.cv}</TableCell>
                <TableCell><Link to={{ pathname: `/profile/${comment.uid}`, state: { uid: comment.uid } }}> {comment.username}</Link></TableCell>
                <TableCell><Button onClick={handleAccept} variant="contained"style={{backgroundColor:"green", color:"white"}}>Accept</Button></TableCell>
                <TableCell><Button onClick={()=>handleReject(comment.appid)} variant="contained" color="secondary">Reject</Button></TableCell>

              </TableRow>
            );
          });
    };


    return(

        <div>
            {getComments()}
        </div>
        
        
    )

}

export default Application;