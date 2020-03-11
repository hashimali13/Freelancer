import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


function Messages(props) {
  const [user, setUser] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();

    function goBackHandle() {
        history.goBack();
    }

    useEffect(() => {
      
        axios
        .get("http://localhost:3001/userid/:id", {
          params: {
            id: props.location.state.user
          }
        })
        .then(res => setUser(res.data), console.log("you here bruv"))
        .catch(err =>
          console.log("you just activated my trap card, go errorsaur")
        );

        axios
        .get("http://localhost:3001/getMessages/:id", {
          params: {
            id: props.location.state.user
          }
        })
        .then(res => setData(res.data), console.log(data))
        .catch(err =>
          console.log("You got so far but in the end it just didn't matter")
        );
    }, []);

    const showData = props => {
        return data.map(messages => {
          return (
          <TableRow key={messages.senderid}>
          <TableCell>{messages.header}</TableCell>
          <TableCell>{messages.content}</TableCell>
        </TableRow>
          );
        });
    };
    return (
        <div>
          {showData(props)}
            <Button variant="contained" color="primary" onClick={goBackHandle}>
                Go Back
            </Button>
            
        </div>
    );
}

export default Messages;