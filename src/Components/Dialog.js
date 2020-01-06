import React,{ useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Dialog2=(props)=>{

      const handleClose = () => {
        setOpen(false);
      };
    const [open, setOpen] = React.useState(true);
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{props.header}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {props.body}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              
              <Button onClick={handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
    )
    

    
}
    export default Dialog2