import React from 'react'
import { AppBar, Toolbar, IconButton , makeStyles} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
    bottom:{
        top: 'auto',
        bottom:0
    },
    actions:{
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}))

function Footer() {
    const classes = useStyles();

    return (
        <AppBar className={classes.bottom}position="fixed">
            <Toolbar className={classes.actions}>
            <IconButton><FacebookIcon /></IconButton>
            <IconButton><InstagramIcon /></IconButton>
            <IconButton><LocationOnIcon /></IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Footer
