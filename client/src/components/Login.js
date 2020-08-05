import React , {useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import {AppContext} from '../context/AppContext'
import axios from 'axios';
import {TextField, Button, Paper, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container:{
        width: '100%',
        maxWidth: '45rem',
        padding: theme.spacing(2),
    },
    form:{
        display:'flex',
        flexDirection: 'column'
    },
    textField:{
        margin: theme.spacing(1),
    },
}))

function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { userData,setUserData, setSnack, setSnackMessage } = useContext(AppContext);
    const history = useHistory();

    const submit = async (e) =>{
         e.preventDefault();
        try{
            const loginUser = { email,password }
            const loginRes = await axios.post("http://localhost:5000/api/v1/users/login", loginUser);
            setUserData({...userData, token: loginRes.data.token, user: loginRes.data.user});
            localStorage.setItem("x-auth-token", loginRes.data.token);
            setEmail('');
            setPassword('');
            history.push('/blogs')
            setSnackMessage(!userData.user ? '' : `Welcome ${userData.user.firstName}`)
            setSnack(true)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <Paper className={classes.container}>
            <form onSubmit={submit} className={classes.form}>
            <Typography variant='h3'>Login</Typography>
             <TextField className={classes.textField} variant="outlined" label="Email" type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
             <TextField className={classes.textField} variant="outlined" label="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button className={classes.textField} variant="contained" color="primary" type='submit'>Login</Button>
            </form>
        </Paper>
    )
}

export default Login
