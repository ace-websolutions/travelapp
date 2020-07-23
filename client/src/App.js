import React, {useState} from 'react';
import Nav from './components/Nav'
import Body from './components/Body'
import Footer from './components/Footer'
import BlogProvider from './context/BlogContext'
import {Grid, Paper } from '@material-ui/core'
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

function App() {
  const [dark, setDark] = useState(false)
  const themeCustom= createMuiTheme({
    palette:{
      primary: dark ? grey : blue,
      type: dark ? 'dark': 'light'
    }
  })
  const useStyles = makeStyles((theme) => ({
    paper:{
      minHeight: '100vh',
      height:'100%',
      backgroundColor: dark ? themeCustom.palette.background.default:'#e3e3e3',
      
    },
    body:{
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    }
  }))
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={themeCustom}>
      <BlogProvider>
       <Paper className={classes.paper}>
       <Nav dark={dark} setDark={setDark}/>
        <Grid container className={classes.body}>
          <Grid item xs={1} sm={2} />
          <Grid container item xs={10} sm={8}>
              <Body />
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
       <Footer />
        </Paper>
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;
