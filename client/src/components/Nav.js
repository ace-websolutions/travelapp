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
    toolBar:{
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
    },
    title:{
        paddingTop: theme.spacing(1),
        color: theme.palette.text.primary
    },
    menuIcon:{
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(2),
    },
    switch:{
        marginLeft: 'auto'
    },
    list:{
        minWidth: 225,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.light
    },
    menu:{
        overflow:'hidden',
        // minHeight: 300
    },
    settings:{
        marginTop:'auto'
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
    const closeSettingsMenu = () => {
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
            <Toolbar className={classes.toolBar}>
                <IconButton className={classes.menuIcon} onClick={() => setOpen(true)}>
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
                                    <FreeBreakfastIcon />
                            </ListItemIcon>
                            <ListItemText primary='Food and Drink' />
                            </ListItem>
                        <ListItem button onClick={openSettingsMenu} className={classes.settings}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings"/>
                        </ListItem>
                    </List>
                </Drawer>
                <Typography variant='h4' className={classes.title}>Travel Blog</Typography>
                <Dialog className={classes.menu} open={openSettings} onClose={closeSettingsMenu} fullWidth maxWidth='sm'>
                    <DialogTitle>Settings</DialogTitle>
                    <Divider />
                    <List className={classes.menu}>
                        <ListItem>
                            <ListItemText primary="Dark Mode" />
                            <Switch className={classes.switch}checked={dark} onChange={() => setDark(!dark)}/> 
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
                            <ListItemText primary="Accent Color" />
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
            </Toolbar>
        </AppBar>

    )
}
export default Nav
