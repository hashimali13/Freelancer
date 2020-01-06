import React,{ useState} from 'react';
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios'
import Dialog from './Dialog'
import { render } from '@testing-library/react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Register =(props)=>{
 
    
    const [ username, setUser ] = useState()
    const [ password, setPass ] = useState()
    const [ email, setEmail ] = useState()

    const [selectedDate, setSelectedDate] = React.useState('2020-01-01')

    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post('http://localhost:3001/create',{
            
              user:username,
              pass:password,
              email:email,
              dob:selectedDate
          }).then(res=>{
            if (res.status===201){
              props.history.push(
                {
                  pathname:'/dashboard',
                  state:{user:username,
                        email:email }
                })
    
            } 
    
          }).catch(error=>{
            console.log(error)
            render(
              <Dialog
                header="Registration error"
                body="Invalid username or password. Please try again."
              />
            )
          })

    }
    const HandleUser=(event)=>{
        setUser(event.target.value)
    }

    const HandlePass=(event)=>{
        setPass(event.target.value)
    }

    const HandleEmail=(event)=>{
        setEmail(event.target.value)
    }

    const HandleDate=(event)=>{
        setSelectedDate(event.target.value)
    }

    return <div className='message-box'>
         <Grid container justify = "center">

        <form onSubmit={handleSubmit}>
        <Typography style={{color:'#828f85'}}variant="h5" gutterBottom>
        Registration
      </Typography>
        <TextField  label="Username" onChange={HandleUser} />
        <br></br><br></br>
        <TextField  label="Password" type="password" onChange={HandlePass}/>
        <br></br><br></br>
        <TextField  label="Email" onChange={HandleEmail}/>
        <br></br><br></br>
        <TextField
            id="date" 
            style={{width:"100%"}}
            onChange={HandleDate}
            label="Date of Birth"
            type="date"
            defaultValue="2020-01-01"
            InputLabelProps={{
            shrink: true,
            }}
        />
        
        <br></br><br></br>
        <Button variant="contained" type="submit" color="primary">
        Create Account   
        </Button>   
      </form>       
      </Grid>
    </div>
  
}

export default Register
