import React, {useState, useContext} from 'react'
import {AppContext} from '../context/AppContext'
import {PAGES} from '../context/AppReducer'
import {AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,ListItemIcon, ListItemText, makeStyles, Switch, Dialog, DialogTitle, Divider, MenuItem, Select} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExploreIcon from '@material-ui/icons/Explore';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import SettingsIcon from '@material-ui/icons/Settings';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';


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
    },
    menu:{
        minWidth: 300,
        // minHeight: 300
    }
}))

function Nav({dark, setDark, primary, setPrimary, secondary, setSecondary}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const {setPage} = useContext(AppContext)

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
    const openSettingsMenu = () => {
        setOpenSettings(true);
        console.log(openSettings)
        // state is ALWAYS false
    }
    const handleClose = () => {
        setOpenSettings(false)
        console.log(openSettings)
    }
    const changePrimary = (event) => {
        setPrimary(event.target.value)
    }
    const changeSecondary = (event) => {
        setSecondary(event.target.value)
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
                            <Divider />
                        <ListItem button onClick={openPlaces}>
                            <ListItemIcon>
                                    <ExploreIcon />
                            </ListItemIcon>
                            <ListItemText primary='Places' /> 
                            </ListItem>
                            <Divider />
                        <ListItem button onClick={openFood}>
                            <ListItemIcon>
                                    <FreeBreakfastIcon />
                            </ListItemIcon>
                            <ListItemText primary='Food and Drink' />
                            </ListItem>
                            <Divider />
                        <ListItem button onClick={openSettingsMenu}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings"/>
                            <Dialog className={classes.menu} open={openSettings} onClose={() => setOpenSettings(false)}>
                                <DialogTitle>Settings</DialogTitle>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Dark Mode" />
                                        <Switch className={classes.switch}checked={dark} onChange={handleClose}/> 
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Primary Color" />
                                        <Select value={primary} onChange={changePrimary}>
                                            <MenuItem value={blue}>Blue</MenuItem>
                                            <MenuItem value={green}>Green</MenuItem>
                                            <MenuItem value={orange}>Orange</MenuItem>
                                            <MenuItem value={pink}>Pink</MenuItem>
                                            <MenuItem value={purple}>Purple</MenuItem>
                                        </Select>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Secondary Color" />
                                        <Select value={secondary} onChange={changeSecondary}>
                                            <MenuItem value={blue}>Blue</MenuItem>
                                            <MenuItem value={green}>Green</MenuItem>
                                            <MenuItem value={orange}>Orange</MenuItem>
                                            <MenuItem value={pink}>Pink</MenuItem>
                                            <MenuItem value={purple}>Purple</MenuItem>
                                        </Select>
                                    </ListItem>
                                </List>
                            </Dialog>
                        </ListItem>
                    </List>
                </Drawer>
                <Typography variant='h4'>Travel Blog</Typography>
            </Toolbar>
        </AppBar>

    )
}
export default Nav
