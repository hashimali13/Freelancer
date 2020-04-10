import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DashPosts from "./Subcomponent/Dashprojects";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

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
          id: props.match.params.id,
        },
      })
      .then((res) => setData(res.data), console.log("user check"))
      .catch((err) =>
        console.log("user error")
      );

    axios
      .get("http://localhost:3001/getProfile/:id", {
        params: {
          uid: props.match.params.id,
        },
      })
      .then((res) => setData2(res.data), console.log("adsfsaf"))
      .catch((err) =>
        console.log("user error")
      );
  }, []);

  


  const showData = (props) => {
    return data.map((profile) => {
      console.log(profile);
      return (
        <Grid spacing={3} style={{width:"90%"}} justify="center" container >
          <Grid justify="center" style={{width:"50%"}}item >
            <Paper style={{padding:"10px 10px 10px 10px "}}
              elevation={3}>
              <Typography
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <img
                    src={profile.profilepicture}
                    style={{ width: "20%" }}
                  ></img>
                  <h1>
                    {profile.firstname} {""} {profile.lastname}{" "}
                  </h1>
                  <h3>{profile.industry}</h3>
                  <h4>{profile.location}</h4>
                    {" "}
                    <h3>About:</h3>  <p>{profile.description}  </p> 
                    <h3>
                      Languages:
                    </h3>
                    <h5>{profile.languages}</h5>
                </div>
                  <h3>
                    Skills:
                  </h3>
                  <p >{showSkills(props)}</p>
              </Typography>
            </Paper>
          </Grid>
          <Grid style={{width:"40%"}} item>
            <Paper  >
              <DashPosts user={profile.username}></DashPosts>
            </Paper>

          </Grid>
        </Grid>
      );
    });
  };

  const showSkills = (props) => {
    let skillarr = []
     data2.map((skills) => {
      skillarr.push(skills.skill, ", ")
      console.log(skills);
    });
    return skillarr
  };

  return (
    <div>
      {showData(props)}
      <Button style={{marginLeft:"5%", marginTop:"20px"}} variant="contained" color="primary" onClick={goBackHandle}>
        Go Back
      </Button>
    </div>
  );
}

export default Profile;
