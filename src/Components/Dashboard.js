import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { typography } from '@material-ui/system';
function App(props) {
  
  return (
    <div style={{width:"100%", height:"30%", textAlign:"center"}} >
      <Typography> Hello {props.location.state.user} </Typography>
      
      <img src={props.location.state.photo} style={{width:"10%", }}></img>
   

    </div>
    
  
  )
}

export default App;
