import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Dialog from "./../Dialog";
import Paper from "@material-ui/core/Paper";
import { render } from "@testing-library/react";
import { useParams, useHistory } from "react-router";

function ComposeMessage (props) {
    const [user, setUser] = useState([]);
    const [header, setHeader] = useState([]);
    const [content, setContent] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();
    var sndId = 0;

    function goBackHandle() {
        history.goBack();
    }

    useEffect(() => {
        setUser(props.match.params.id);
    }, []);

    useEffect(() => {
        axios
        .get("http://localhost:3001/getReceiverId/:id", {
            params: {
                id: props.location.state.user
            }
        })
        .then(res => setData(res.data), console.log(data))
        .catch(err =>
            console.log("You got so far but in the end it just didn't matter")
        );
    }, []);

    console.log(data.map(messages => {
        sndId = messages.senderid;
    }));

    const HandleSubmit = event => {
        event.preventDefault();
        axios
            .post('http://localhost:3001/sendmessage/:id', {
                header: header,
                content: content,
                senderid: props.match.params.id,
                receiverid: sndId,
            })
            .then(res => {
                console.log("yo");
                if (res.status === 201) {
                    props.history.push({
                        pathname: "/messages",
                        state: {
                            user: props.match.params.id,
                            photo: props.match.params.photo
                        }
                    });
                }
            })
            .catch(error => {
            console.log(error);
                render(
                    <Dialog
                        header="Error sending message"
                        body="Unable to send the message. Please try again."
                    />
                );
            });
    };

    const HandleHeader = event => {
        setHeader(event.target.value);
    }
    
    const HandleContent = event => {
      setContent(event.target.value);
    }
    
    return (
        <div>
            <form onSubmit={HandleSubmit} style={{textAlign: "center"}}>
                <TextField id="header" label="Enter Subject Header" onChange={HandleHeader} />
                <TextField id="content" label="Enter Message" onChange={HandleContent} />
                <Button variant="contained" type="submit" color="primary">
                    Send Message
                </Button>
            </form>
            <br></br>
            <br></br>
            <Button
            variant="contained"
            color="primary"
            justifyContent="center"
            onClick={goBackHandle}
            >
                Go Back
            </Button>
        </div>
    );
};

export default ComposeMessage;