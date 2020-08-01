import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import {PAGES} from '../context/AppReducer'
import {AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,ListItemIcon, ListItemText, makeStyles, Switch, Dialog, DialogTitle, Divider, MenuItem, Select, ButtonGroup, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExploreIcon from '@material-ui/icons/Explore';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import SettingsIcon from '@material-ui/icons/Settings';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const colors = [
    {muiName: red, text:'Red'},
    {muiName: pink, text:'Pink'},
    {muiName: purple, text:'Purple'},
    {muiName: deepPurple, text:'Dark Purple'},
    {muiName: indigo, text:'Indigo'},
    {muiName: blue, text:'Blue'},
    {muiName: lightBlue, text:'Light Blue'},
    {muiName: cyan, text:'Cyan'},
    {muiName: teal, text:'Teal'},
    {muiName: green, text:'Green'},
    {muiName: lightGreen, text:'Light Green'},
    {muiName: lime, text:'Lime'},
    {muiName: yellow, text:'Yellow'},
    {muiName: amber, text:'Amber'},
    {muiName: orange, text:'Orange'},
    {muiName: deepOrange, text:'Dark Orange'},
    {muiName: brown, text:'Brown'},
    {muiName: grey, text:'Grey'},
    {muiName: blueGrey, text:'Blue-Grey'},
]


const useStyles = makeStyles((theme) => ({
    toolBar:{
        justifyContent: 'space-between',
        alignItems: 'center',
        position:'relative'
    },
    title:{
        paddingTop: theme.spacing(1),
        color: theme.palette.text.primary
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
    const {homePage, setHomePage, userData, setUserData} = useContext(AppContext)
    const history = useHistory();

    const register = () => {
        history.push("/register");
    }
    const login = () => {
        history.push("/login");
    }
    const logout = () => {
        setUserData({
            token:undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "")
        history.push("/login");
    }
    const openBlog = () => {
        history.push("/blogs");
        setOpen(false)
    }
    const openPlaces = () => {
        history.push("/places");
        setOpen(false)
    }
    const openFood = () => {
        history.push("/foods");
        setOpen(false)
    }
    const openSettingsMenu = () => {
        setOpenSettings(true);
    }
    const closeSettingsMenu = () => {
        setOpenSettings(false)
    }
    const changePrimary = (event) => {
        setPrimary(event.target.value)
    }
    const changeSecondary = (event) => {
        setSecondary(event.target.value)
    }
    const changeHomePage = (event) =>{
        if(event.target.value === PAGES.BLOG)
            return setHomePage(PAGES.BLOG)
        if(event.target.value === PAGES.PLACES)
            return setHomePage(PAGES.PLACES)
        if(event.target.value === PAGES.FOOD)
            return setHomePage(PAGES.FOOD)
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
            
                    {!userData.user ? (<ButtonGroup><Button onClick={register}>Register</Button>
                    <Button onClick={login}>Login</Button></ButtonGroup>) : (<Button variant='outlined' onClick={logout}>Log out</Button>)}
    
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
                                {colors.map((color) => (
                                    <MenuItem key={color.muiName} value={color.muiName}>{color.text}</MenuItem>
                                ))}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Accent Color" />
                            <Select value={secondary} onChange={changeSecondary}>
                            {colors.map((color) => (
                                    <MenuItem key={color.muiName} value={color.muiName}>{color.text}</MenuItem>
                                ))}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Homepage" />
                            <Select value={homePage} onChange={changeHomePage}>
                                <MenuItem value={PAGES.BLOG}>Blogs</MenuItem>
                                <MenuItem value={PAGES.PLACES}>Places</MenuItem>
                                <MenuItem value={PAGES.FOOD}>Food and Drink</MenuItem>
                            </Select>
                        </ListItem>
                    </List>
                </Dialog>
            </Toolbar>
        </AppBar>

    )
}
export default Nav
