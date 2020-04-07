import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";

function Application (props) {
    let commentid = props.commentid
    const [data, setData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios
        .get("http://localhost:3001/getcomments/:id", {
            params: {
                id: commentid
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


    const getComments = props =>{
        return data.map(comment => {
            return (
              <TableRow key={comment.cid}>
                <TableCell>{comment.username}</TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.date}</TableCell>
                <TableCell>{comment.location}</TableCell>
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