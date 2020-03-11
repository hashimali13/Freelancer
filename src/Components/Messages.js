import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Messages(props) {
    const [data, setData] = useState([]);
    console.log(props);
    const history = useHistory();

    function goBackHandle() {
        history.goBack();
    }

    useEffect(() => {
        axios
        .get("http://localhost:3001/userid/:id", {
          params: {
            id: props.match.params.id
          }
        })
        .then(res => setData(res.data), console.log("you here bruv"))
        .catch(err =>
          console.log("you just activated my trap card, go errorsaur")
        );

        axios
        .get("http://localhost:3001/getMessages/:id", {
          params: {
            uid: props.match.params.id
          }
        })
        .then(res => setData(res.data), console.log("You got the data broski"))
        .catch(err =>
          console.log("You got so far but in the end it just didn't matter")
        );
    }, []);

    const showData = props => {
        return data.map(messages => {
          console.log(messages);
          return (
            <div>
              <h1> Hello {messages.content} </h1>
            </div>
          );
        });
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={goBackHandle}>
                Go Back
            </Button>
            {showData(props)}
        </div>
    );
}

export default Messages;