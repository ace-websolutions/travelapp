import React from 'react'
import { AppBar, Toolbar, IconButton , makeStyles} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
    bottom:{
        top: 'auto',
        bottom:0,
    },
    actions:{
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    link:{
        textDecoration: 'none',
        backgroundColor: 'inherit',
        color: 'inherit',
        '&:link':{
            textDecoration: 'none',
            backgroundColor: 'inherit',
            color: 'inherit'
        },
        '&:visited':{
            textDecoration: 'none',
            backgroundColor: 'inherit',
            color: 'inherit'
        },
        '&:hover':{
            textDecoration: 'none',
            backgroundColor: 'inherit',
            color: 'inherit'
        },
        '&:active':{
            textDecoration: 'none',
            backgroundColor: 'inherit',
            color: 'inherit'
        },
    }
}))

function Footer() {
    const classes = useStyles();

    return (
        <AppBar className={classes.bottom} position='fixed'>
            <Toolbar className={classes.actions}>
            <IconButton>
                <a className={classes.link} href='https://www.facebook.com/' target="_blank" rel="noopener noreferrer" >
                    <FacebookIcon />
                </a>
            </IconButton>
            <IconButton>
                <a className={classes.link} href='https://www.instagram.com/' target="_blank" rel="noopener noreferrer" >
                    <InstagramIcon />
                </a>
            </IconButton>
            <IconButton>
                <a className={classes.link} href='#' target="_blank" rel="noopener noreferrer" >
                    <LocationOnIcon />
                </a>
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Footer
