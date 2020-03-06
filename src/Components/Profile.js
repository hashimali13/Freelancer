import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";

function Profile(props) {
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
      .get("http://localhost:3001/getProfile/:id", {
        params: {
          uid: props.match.params.id
        }
      })
      .then(res => setData(res.data), console.log("adsfsaf"))
      .catch(err =>
        console.log("you just activated my trap card, go errorsaur")
      );
  }, []);

  const showData = props => {
    return data.map(profile => {
      console.log(profile);
      return (
        <div>
          <h1> Hello {profile.firstname} </h1>
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Helloworld1 </h1>
      <Button variant="contained" color="primary" onClick={goBackHandle}>
        Go Back
      </Button>
      <p>
        Not fetching the data for some reason, gives me: 'GET
        http://localhost:3001/getprofile?uid=1 404 (Not Found)'
      </p>
      {showData(props)}
    </div>
  );
}

export default Profile;
