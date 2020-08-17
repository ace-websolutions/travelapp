import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import AppProvider from './context/AppContext'
import Nav from './components/Nav'
import Body from './components/Body'
import Footer from './components/Footer'
import { Grid, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
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
      backgroundColor: '#f6f6f6',
      display:'flex',
      flexDirection: 'column',
    },
  }))
  const classes = useStyles();
  
  return (
    <Router>
      <AppProvider>
        <ThemeProvider theme={themeCustom}>
          <Paper className={classes.paper}>
            <Nav dark={dark} setDark={setDark} primary={primary} setPrimary={setPrimary} secondary={secondary} setSecondary={setSecondary}/>
                <Body />
            <Footer />
          </Paper>
        </ThemeProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
