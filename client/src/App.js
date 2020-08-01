import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AppProvider from './context/AppContext'
import Nav from './components/Nav'
import Body from './components/Body'
import Footer from './components/Footer'
import {Grid, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

function App() {
  const [primary, setPrimary] = useState(blue)
  const [secondary, setSecondary] = useState(pink)
  const [dark, setDark] = useState(false)

  const themeCustom= createMuiTheme({
    palette:{
      primary: primary,
      secondary: secondary,
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
    },
    center: {
      display:'flex',
      justifyContent: "center",
      alignItems: 'center'
    }
  }))
  const classes = useStyles();
  
  // add snackbar to successful login / registration as well as bad form submission err
  return (
    <Router>
      <AppProvider>
        <ThemeProvider theme={themeCustom}>
          <Paper className={classes.paper}>
            <Nav dark={dark} setDark={setDark} primary={primary} setPrimary={setPrimary} secondary={secondary} setSecondary={setSecondary}/>
              <Grid container className={classes.body}>
                <Grid item xs={1} sm={2} />
                    <Grid container item xs={10} sm={8} className={classes.center}>
                      <Body />
                    </Grid>
                  <Grid item xs={1} sm={2} />
              </Grid>
            <Footer />
          </Paper>
        </ThemeProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
