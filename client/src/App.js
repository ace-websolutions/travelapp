import React from 'react';
import Nav from './components/Nav'
import Body from './components/Body'
import Footer from './components/Footer'
import BlogProvider from './context/BlogContext'
import {Grid, Paper } from '@material-ui/core'
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette:{
    primary: blue
  }
})

const useStyles = makeStyles((theme) => ({
  paper:{
    height:`100vh`,
    backgroundColor: theme.palette.background.default
  },
  body:{
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}))

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <BlogProvider>
       <Nav />
        <Grid container className={classes.body} component={Paper}>
          <Grid item xs={1} sm={2} />
          <Grid container item xs={10} sm={8}>
              <Body />
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
       <Footer />
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;
