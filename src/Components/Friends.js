import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { render } from "@testing-library/react";
import Dialog from "./Dialog";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";

function Friends(props) {
    let uid = props.location.state.user;
    let friend = null;
    const [username, setUsername] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();
    const [data2, setFriend] = useState([]);

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

    useEffect(() => {
        axios
        .get("http://localhost:3001/getfriends", {
            params: {
                user: uid
            }
        })
        .then(res => setFriend(res.data))
        .catch(err => console.log("friend console"));
    }, []);

    console.log(data2.rows);

    const createTable = () => {
        return data2.map(friend => {
            console.log(friend);
            return (
                <TableRow key={friend.userid}>
                    <TableCell>{friend.username}</TableCell>
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Friend</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createTable()}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" justifyContent="center" onCLick={goBackHandle}>
                Go back
            </Button>
        </div>
    );
}

export default Friends;