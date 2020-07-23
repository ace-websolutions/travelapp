import React, {useState, useContext} from 'react'
import {BlogContext} from '../context/BlogContext'
import {PAGES} from '../context/AppReducer'
import {AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,ListItemIcon, ListItemText, makeStyles, Switch} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExploreIcon from '@material-ui/icons/Explore';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const useStyles = makeStyles((theme) => ({
    switch:{
        marginLeft: 'auto'
    },
    list:{
        width: 150,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: theme.palette.primary.light
    }
}))

function Nav({dark, setDark}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {setPage} = useContext(BlogContext)

    const openBlog = () => {
        setPage(PAGES.BLOG)
        setOpen(false)
    }
    const openPlaces = () => {
        setPage(PAGES.PLACES)
        setOpen(false)
    }
    const openFood = () => {
        setPage(PAGES.FOOD)
        setOpen(false)
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                    <List className={classes.list}>
                        <ListItem button onClick={openBlog}>
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary='Blogs' />
                            </ListItem>
                        <ListItem button onClick={openPlaces}>
                            <ListItemIcon>
                                    <ExploreIcon />
                            </ListItemIcon>
                            <ListItemText primary='Places' /> 
                            </ListItem>
                        <ListItem button onClick={openFood}>
                            <ListItemIcon>
                                    <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary='Food' />
                            </ListItem>
                    </List>
                </Drawer>
                <Typography variant='h4'>Travel Blog</Typography>
                <Switch className={classes.switch}checked={dark} onChange={() => setDark(!dark)}/>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
