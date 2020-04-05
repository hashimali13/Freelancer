import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { render } from "@testing-library/react";
import Dialog from "./Dialog";
import Messages from "./Messages";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function Friends(props) {
    let uid = props.location.state.user;
    let friend = null;
    const [username, setUsername] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();

    function goBackHandle() {
        history.goBack();
    }

    const HandleUsername = event => {
        setUsername(event.target.value);
    }

    const HandleSecondSubmit = event => {
        event.preventDefault();
        data.map(user => {
            friend = user.uid;
        });
        axios
        .post("http://localhost:3001/addfriend/:id", {
            friend: friend,
            userid: uid
        })
        .then(res => {
            console.log("first point");
            if (res.status === 201) {
                render(
                    <Dialog
                        header="Friend has been added"
                    />
                );
            }
        })
        .catch(error => {
            console.log(error);
            render(
                <Dialog 
                    header="Error sending friend request"
                    body="Unable to send friend request, please try again"
                />
            );
        });
    };

    const HandleSubmit = event => {
        event.preventDefault();
        axios
        .post("http://localhost:3001/getusername/:id", {
            username: username
        })
        .then(res => setData(res.data), console.log(data))
        .catch(error => {
            console.log(error);
                render(
                    <Dialog
                        header="Error"
                        body="No user found"
                    />
                );
        });
    };

    const showData = props => {
        return data.map(user => {
            console.log(user);
            return (
                <TableRow key={user.uid}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary" onClick={HandleSecondSubmit}>
                            Add Friend
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <div>
            <Typography variant="h5">Add Friends</Typography>
            <form onSubmit={HandleSubmit} style={{textAlign: "center"}}>
                <TextField id="username" label="Enter username" onChange={HandleUsername} />
                <Button variant="contained" type="submit" color="primary">Search</Button>
            </form>
            {showData(props)}
            <Button variant="contained" color="primary" justifyContent="center" onCLick={goBackHandle}>
                Go back
            </Button>
        </div>
    );
}

export default Friends;