import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function Profile(props) {
  const [people, setPeople] = useState([]);
  const [data2, setData2] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const people5467 = ["Bailey", "Hashim", "Nathan", "NotBailey"];
  console.log(props);
  const history = useHistory();
  console.log(people);

  //small features - not important!!
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //small features - not important!!
  function goBackHandle() {
    history.goBack();
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/searchbarusername")
      .then((res) => setPeople(res.data), console.log("call to get all users"))
      .catch(
        (error) => console.log(error),
        console.log("error ping in search.js")
      );
    // The axios call below needs to be changed a bit to only get jobposting.title or something
    //axios
    //   .get("http://localhost:3001/getproject")
    //   .then((res) => setData2(res.data), console.log("call to get all posts"))
    //   .catch(
    //     (error) => console.log(error),
    //     console.log("error ping 23345433 in search.js")
    //   );
  }, []);

  React.useEffect(() => {
    const userresults = people5467.filter((idk) =>
      idk.toLowerCase().includes(searchTerm)
    );
    setSearchResults(userresults);
  }, [searchTerm]);

  const showData = (props) => {
    return (
      <div>
        <div>
          <input type="text" value={searchTerm} onChange={handleChange} />
          <ul>
            {searchResults.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        {/* This will be changed out for searching jobposting.title or something
        <Paper>
          <h3>
            <u>Skills</u>
          </h3>
          <ul style={{ listStyleType: "none" }}>{showSkills(props)}</ul>
        </Paper> */}
      </div>
    );
  };

  const showSkills = (props) => {
    return data2.map((skills) => {
      // console.log(skills);
      return (
        <li>
          <h5>{skills.skill}</h5>
        </li>
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

export default Profile;
