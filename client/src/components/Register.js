import React , {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import {AppContext} from '../context/AppContext'
import axios from 'axios';
import {TextField, Button, Paper, SnackBar, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container:{
        width: '100%',
        maxWidth: '45rem',
        padding: theme.spacing(2),
        display:'flex',
        flexDirection: 'column'
    },
    textField:{
        margin: theme.spacing(1),
    },
}))

function Register() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [checkPassword, setCheckPassword] = useState();

    const {setUserData} = useContext(AppContext);
    const history = useHistory();

    const submit = async (e) =>{
        e.preventDefault();
        const newUser = { email, firstName:name, password, passwordCheck: checkPassword}
        await axios.post("http://localhost:5000/api/v1/users/register", newUser)
        const loginRes = await axios.post("http://localhost:5000/api/v1/users/login", {
            email, 
            password
        });
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        setEmail('');
        setName('');
        setPassword('');
        setCheckPassword('');
        history.push('/blogs')
    }
    return (
        <Paper className={classes.container}>
            <Typography variant='h3'>Register</Typography>
             <TextField className={classes.textField} variant="outlined" label="Email" type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
             <TextField className={classes.textField} variant="outlined" label="First Name" type='text' value={name} onChange={(e) => setName(e.target.value)}/>
             <TextField className={classes.textField} variant="outlined" label="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
             <TextField className={classes.textField} variant="outlined" label="Verify Password" type='password' value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)}/>
            <Button className={classes.textField} variant="contained" color="primary" onClick={submit}>Submit</Button>
        </Paper>
    )
}

export default Register
