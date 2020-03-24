import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RecentProjects from "./Subcomponent/MyPosts";
import Typography from "@material-ui/core/Typography";

function Profile(props) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

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
      .get("http://localhost:3001/getProfile/:id", {
        params: {
          uid: props.match.params.id
        }
      })
      .then(res => setData2(res.data), console.log("adsfsaf"))
      .catch(err =>
        console.log("you just activated my trap card, go errorsxaur")
      );
  }, []);

  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    },
    leftColumn: {
      order: 0
    },
    rightColumn: {
      order: 1,
      flexGrow: 2
    }
  }));

  const style = useStyles();

  const showData = props => {
    return data.map(profile => {
      console.log(profile);
      return (
        <div className={style.container}>
          <div className={style.leftColumn}>
            <Paper
              elevation={3}
              style={{ padding: "50pt", paddingTop: "15px", width: "25%" }}
            >
              <Typography>
                <div>
                  <img
                    src={profile.profilepicture}
                    style={{ width: "40%" }}
                  ></img>
                  <h1>
                    {profile.firstname} {""} {profile.lastname}{" "}
                  </h1>
                  <h2>{profile.industry}</h2>
                  <h4>{profile.location}</h4>
                  <br />
                  <h3>About:</h3>
                  <h3>{profile.description}</h3>
                  <hr />
                  <h5>Languages:</h5>
                  <h5>{profile.languages}</h5>
                </div>
                <ul>{showSkills(props)}</ul>
              </Typography>
            </Paper>
          </div>
          <Paper className={style.rightColumn}>
            <RecentProjects user={profile.username}></RecentProjects>
          </Paper>
        </div>
      );
    });
  };

  const showSkills = props => {
    return data2.map(skills => {
      console.log(skills);
      return <li>{skills.skill}</li>;
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

export default Profile;
