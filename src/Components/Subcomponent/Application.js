import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

function Application (props) {
    let appid = props.appid

    useEffect(() => {
        axios
        .get("http://localhost:3001/getapplication/:id", {
            params: {
                id: appid
            }
        })
        .then(res => setData(res.data), console.log(data))
        .catch(err =>
            console.log("You got so far but in the end it just didn't matter")
        );
    }, []);

    return(
        <div></div>
    )

}

export default Application;