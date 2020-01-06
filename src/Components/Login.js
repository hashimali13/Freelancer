import React,{ useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import Dialog from './Dialog'
import { render } from '@testing-library/react';
  
  const Login =(props) =>{

    const [ username, setUser ] = useState()
    const [ password, setPass ] = useState()
    

   
    const HandleUser=(event)=>{
        setUser(event.target.value)
    }

    const HandlePass=(event)=>{
        setPass(event.target.value)
    }

    const handleSubmit=(event)=>{
      event.preventDefault()
      
      axios.get('http://localhost:3001/authuser',{
        params: {
          user:username,
          pass:password
        }
      }).then(res=>{
        if (res.status===200){
          console.log(res.data[0].profilepicture)
          props.history.push(
            {
              pathname:'/dashboard',
              state:{user:res.data[0].username,
                    photo:res.data[0].profilepicture }
            })

        } 

      }).catch(error=>{
        console.log("sdsd")
        render(
          <Dialog
            header="Login error"
            body="Invalid username or password. Please try again."
          />
        )
      })
    }

  return(
    
      <Grid container justify = "center">
        
        <form onSubmit={handleSubmit}>
        <Typography style={{color:'#828f85'}}variant="h5" gutterBottom>
        Enter user details
      </Typography>
        <TextField  label="Username" onChange={HandleUser} />
        <br></br><br></br>
        <TextField  label="Password" type="password" onChange={HandlePass}/>
        <br></br><br></br>
        <Button variant="contained" type="submit" color="primary">
        Login   
        </Button> 
        <Button variant="contained" onClick={()=>props.history.push({pathname:'/register'})} style={{marginLeft:'5px'}} color="primary">
        Register   
        </Button> 
      </form>   
     
  
          
      </Grid>
      
  );
}

export default Login;
