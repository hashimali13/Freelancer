import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { typography } from '@material-ui/system';

function App(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    toolBar: {
      paddingRight: 24,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }));

  const drawerWidth = 240;

  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Paper elevation={3} style={{padding:"50pt",paddingTop:"15px"}}>
        <div style={{width:"100%", height:"30%", textAlign:"center"}} >
          <Typography> Hello {props.location.state.user} </Typography>
          <img src={props.location.state.photo} style={{width:"10%", }}></img>
        </div>
          <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item>
              <Paper>
                <Typography onClick={()=>props.history.push({pathname:'/myprojects'})}>Recent Projects</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography onClick={()=>props.history.push({pathname:'/newsfeed'})}>News Feed</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography onClick={()=>props.history.push({pathname:'/projects'})}>Browse Projects</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
    </div>
  )
}

export default App;