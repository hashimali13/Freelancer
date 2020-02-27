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
import Clock from './Clock';

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
      <Grid container justify="center">
        <Paper elevation={3} style={{ padding: "50pt", paddingTop: "15px", width: "25%" }}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item>
              <div style={{ width: "100%", height: "0%", textAlign: "center" }} >
                <Typography> Hello {props.location.state.user} </Typography>
                <Clock></Clock>
                <img src={props.location.state.photo} style={{ width: "40%", }}></img>
              </div>
            </Grid>
            <Grid item>
              <Paper>
                <Typography onClick={() => props.history.push
                  ({
                    pathname: '/myprojects',
                    state: {
                      user: props.location.state.user,
                      photo: props.location.state.photo
                    }
                  })}>My Projects</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                  <Typography>
                    Click on "My Projects" to view your currently accepted projects.
                  </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography onClick={() => props.history.push({ pathname: '/newsfeed' })}>News Feed</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography>
                  Click on "News Feed" to the latest news.
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography onClick={() => props.history.push({ pathname: '/projects' })}>Browse Projects</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Typography>
                  Click on "Browse Projects" to view all available projects.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default App;