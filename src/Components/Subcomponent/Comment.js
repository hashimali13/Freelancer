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
import { Avatar } from "@material-ui/core";

function Application (props) {
    let commentid = props.commentid
    const [data, setData] = useState([]);
    const history = useHistory();
    let [commentCount,setCount] = useState();;
    useEffect(() => {
        axios
        .get("http://localhost:3001/getcomments/:id", {
            params: {
                id: commentid
            }
        })
        .then(res => {
             setData(res.data)
             setCount(res.data.length)
             console.log(commentCount)
        }
            
        )
        .catch(err =>
            console.log("You got so far but in the end it just didn't matter")
        );
    }, []);


    const getComments = props =>{
        return data.map(comment => {
            
            let first = comment.firstname.charAt(0)
            let last = comment.lastname.charAt(0)
            return (
              <TableRow key={comment.cid}>
                <TableCell>
                    <Link style={{textDecoration:"none"}} to={{ pathname: `/profile/${comment.uid}`, state: { uid: comment.uid } }}>  
                        <Avatar > {first + last}</Avatar> 
                    </Link> 
                </TableCell>
                <TableCell>{comment.username}</TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.location}</TableCell>
              </TableRow>
            );
          });
    };


    return(

        <div>
            <Typography>
                  <h2> {commentCount} Comments </h2>
                </Typography>
            {getComments()}
        </div>
        
        
    )

}

export default Application;