import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function Profile(props) {
  const history = useHistory();
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const fakepeople = ["Bailey", "Hashim", "Nathan", "NotBailey"];
  console.log(fakepeople);
  const users = people.map((userlist) => userlist.username);
  console.log(users);

  //small feature - not issssmportant!!
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //small feature - not important!!
  function goBackHandle() {
    history.goBack();
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/searchbar")
      .then((res) => setPeople(res.data), console.log("here we go22"))
      .catch((err) => console.log("projectconsole1111111122221"));
  }, []);

  React.useEffect(() => {
    //This is where i am having the issue.
    //If userresults = fakepeople.filter..., the program works
    //If userresults = users.filter..., the program doesnt work
    //Both of the
    const userresults = fakepeople.filter((idk) =>
      idk.toLowerCase().includes(searchTerm)
    );
    setSearchResults(userresults);
  }, [searchTerm]);

  const showTrial = () => {
    return people.map((profile) => {
      console.log(profile.username);
      return <div>{profile.username}</div>;
    });
  };

  const showData = (props) => {
    return (
      <div>
        {showTrial(props)}
        <div>
          <input type="text" value={searchTerm} onChange={handleChange} />
          <ul>
            {searchResults.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showData(props)}
      <Button variant="contained" color="primary" onClick={goBackHandle}>
        Go Back
      </Button>
      <ul>{users}</ul>
      <ul>{fakepeople}</ul>
    </div>
  );
}

export default Profile;
