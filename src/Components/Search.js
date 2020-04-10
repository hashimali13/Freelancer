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
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function Search(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [search, setSearch] = useState([]);
  let uid = props.location.state.uid;
  console.log(uid);

  function goBackHandle() {
    history.goBack();
  }

  const HandleSearch = (event) => {
    setSearch(event.target.value);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(search);

    axios
      .get("/searchbaru", {
        params: {
          id: search,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/searchbarp", {
        params: {
          id: search,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setData2(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showUsers = (props) => {
    return data.map((user) => {
      console.log(user.username);
      return (
        <TableRow>
          <TableCell>
            <Link to={{ pathname: `/profile/${uid}` }}>{user.username}</Link>
          </TableCell>
        </TableRow>
      );
    });
  };

  // this is for the posts one, testing users first
  // const showUsers = (props) => {
  //   return data.map((user) => {
  //     console.log(user.username);
  //     return (
  //       <TableRow key={user.id}>
  //         <TableCell>
  //           <Link to={{ pathname: `/profile/${uid}` }}>{user.username}</Link>
  //         </TableCell>
  //       </TableRow>
  //     );
  //   });
  // };

  const createTable = () => {
    return (
      <Table>
        <TableRow>
          <TableCell>Users</TableCell>
          <TableCell>Posts</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{showUsers}</TableCell>
          {/* <TableCell>{showPosts}</TableCell> */}
        </TableRow>
      </Table>
    );
  };

  return (
    <div>
      <Typography variant="h5">Search</Typography>
      <form onSubmit={HandleSubmit} style={{ textAlign: "center" }}>
        <TextField id="search" label="Search here" onChange={HandleSearch} />
        <Button variant="contained" type="submit" color="primary">
          Search
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Friend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{createTable()}</TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        justifyContent="center"
        onCLick={goBackHandle}
      >
        Go back
      </Button>
      {showUsers}
    </div>
  );
}

export default Search;
