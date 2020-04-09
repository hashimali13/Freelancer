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
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Avatar } from "@material-ui/core";


import TableRow from "@material-ui/core/TableRow";

function Application (props) {
    let appid = props.appid
    const [username, setUser] = useState([]);
    let postingData = props.postingId
    const [data, setData] = useState([]);
    const history = useHistory();
    useEffect(() => {

        axios.get('/userid/:id', {
            params: {
              id: props.uid
            }
          })
          .then(function (res) {
            setUser(res.data[0].username)
          })
          .catch(function (error) {
            console.log(error);
          });

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
        console.log(props)
        axios
        .get("http://localhost:3001/getpost", {
          params: {
            id: postingData,
          },
        })
        .then((res) =>{
                let postData = res.data[0]
                axios.post('/createjob', {
                    uid: props.uid,
                    deadline: postData.deadline,
                    deliverables: postData.content,
                    jobtype: postData.jobtype,
                    title: postData.title,
                    postdate: postData.postdate,
                    pid: postData.uid      
                  })
                  .then(function (res) {
                      console.log(postData)
                    axios.post('/deleteallapplications', {
                        id: postData.jobid    
                      })
                      .then(function (res) {
                        axios.post('/deleteallcomments', {
                            id: postData.jobid
                          })
                          .then(function (response) {
                            axios.post('/deletepost', {
                                jobid: postData.jobid
                              })
                              .then(function (response) {
                                history.push({
                                    pathname: `/myprojects/${props.uid}`,
                                    state: {
                                    user: username,
                                    },
                                  });
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        )
        .catch((err) => console.log("THAT SUCKS"));
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
                <TableCell>
                    <Link style={{textDecoration:"none"}} to={{ pathname: `/profile/${comment.uid}`, state: { uid: comment.uid } }}>  
                        <Avatar src={comment.profilepicture}></Avatar> 
                    </Link> 
                </TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{comment.cv}</TableCell>
                <TableCell><Link to={{ pathname: `/profile/${comment.uid}`, state: { uid: comment.uid } }}> {comment.username}</Link></TableCell>
                <TableCell>£{comment.price}/hr</TableCell>
                <TableCell><Button onClick={()=>handleAccept(comment)} variant="contained"style={{backgroundColor:"green", color:"white"}}>Accept</Button></TableCell>
                <TableCell><Button onClick={()=>handleReject(comment.appid)} variant="contained" color="secondary">Reject</Button></TableCell>

              </TableRow>
            );
          });
    };


    return(

        <Table>
          <TableBody>
            {getComments()}
          </TableBody>
            
        </Table>
        
        
    )

}
export default Application;
