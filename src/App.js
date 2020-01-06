import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from '@material-ui/core';
import Register from './Components/Register';

function App() {

  return (
    <div>
    
        <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon >dfdf</MenuIcon>
          </IconButton>
          <Typography variant="h6" >
            Freelancer
          </Typography>
        </Toolbar>
     </AppBar> 

      <br></br>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={Register} />

    </div>
    
  );
}

export default App;
