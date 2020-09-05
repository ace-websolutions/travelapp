import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { PAGES, ACTIONS, MESSAGE } from '../context/AppReducer'
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, 
    ListItemIcon, ListItemText, makeStyles, Switch, Dialog, DialogTitle, Divider, 
    MenuItem, Select, ButtonGroup, Button, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExploreIcon from '@material-ui/icons/Explore';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import SettingsIcon from '@material-ui/icons/Settings';
import BugReportIcon from '@material-ui/icons/BugReport';
import GitHubIcon from '@material-ui/icons/GitHub';
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

const getColor = (color) => {
    if(color === 'Red') return red
    if(color === 'Pink') return pink
    if(color === 'Purple') return purple
    if(color === 'Dark Purple') return deepPurple
    if(color === 'Indigo') return indigo
    if(color === 'Blue') return blue
    if(color === 'Light Blue') return lightBlue
    if(color === 'Cyan') return cyan
    if(color === 'Teal') return teal
    if(color === 'Green') return green
    if(color === 'Light Green') return lightGreen
    if(color === 'Lime') return lime
    if(color === 'Yellow') return yellow
    if(color === 'Amber') return amber
    if(color === 'Orange') return orange
    if(color === 'Dark Orange') return deepOrange
    if(color === 'Brown') return brown
    if(color === 'Grey') return grey
    if(color === 'Blue-Grey') return blueGrey
}
const storeColor = (color) => {
    if(color === red) return 'Red'
    if(color === pink) return 'Pink'
    if(color === purple) return 'Purple'
    if(color === deepPurple) return 'Dark Purple'
    if(color === indigo) return 'Indigo'
    if(color === blue) return 'Blue'
    if(color === lightBlue) return 'Light Blue'
    if(color === cyan) return 'Cyan'
    if(color === teal) return 'Teal'
    if(color === green) return 'Green'
    if(color === lightGreen) return 'Light Green'
    if(color === lime) return 'Lime'
    if(color === yellow) return 'Yellow'
    if(color === amber) return 'Amber'
    if(color === orange) return 'Orange'
    if(color === deepOrange) return 'Dark Orange'
    if(color === brown) return 'Brown'
    if(color === grey) return 'Grey'
    if(color === blueGrey) return 'Blue-Grey'
}
function Nav({ dark, setDark, primary, setPrimary, secondary, setSecondary }) {
    const useStyles = makeStyles((theme) => ({
        appBar:{
            [theme.breakpoints.up('xl')]:{
                alignItems:'center',
            }
        },
        toolBar:{
            justifyContent: 'space-between',
            alignItems: 'center',
            position:'relative',
            [theme.breakpoints.up('xl')]:{
                width:1260,
            }
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
            justifyContent: 'space-between',
            backgroundColor: dark ?  theme.palette.primary.dark : theme.palette.primary.light
        },
        menu:{
            overflow:'hidden',
        },        
        text: {
            zIndex: 10,
            color: theme.palette.text.primary,
            textDecoration: "none",
          },
    }))
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const { homePage, setHomePage, userData, setUserData,
        dispatchBlogs, dispatchPlaces, dispatchFoods, 
         snackMessage, configData, setSnackMessage } = useContext(AppContext)
    const history = useHistory();

    useEffect(() => {
        updateTheme();
        // eslint-disable-next-line
        }, [userData])
    const updateTheme = async () => {
        if(userData.user) {
            setPrimary(getColor(userData.user.primary))
            setSecondary(getColor(userData.user.secondary))
            setDark(userData.user.theme)
        } 
      }    
    const logout = async() => {
        setUserData({
            token:undefined,
            user: undefined
        })
        await localStorage.removeItem("x-auth-token")
        await dispatchBlogs({type: ACTIONS.GET_BLOG, payload: []});
        await dispatchPlaces({type: ACTIONS.GET_PLACE, payload: []});
        await dispatchFoods({type: ACTIONS.GET_FOOD, payload: []});
        await setDark(false);
        await setPrimary(orange)
        await setSecondary(pink)
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
    const changePrimary = async (event, id) => {
        setPrimary(event.target.value)
        const user = {...userData.user, primary: storeColor(event.target.value)}
        try{
            await axios.post(`/api/v1/users/${id}`, user, configData)
            setUserData({...userData, user})
            setSnackMessage(MESSAGE.UPDATE_SETTINGS);
        }catch(err){
            console.log(err)
        }
    }
    const changeSecondary = async (event, id) => {
        setSecondary(event.target.value)
        const user = {...userData.user, secondary: storeColor(event.target.value)}
        try{
            await axios.post(`/api/v1/users/${id}`, user, configData)
            setUserData({...userData, user})
            setSnackMessage(MESSAGE.UPDATE_SETTINGS);
        }catch(err){
            console.log(err)
        }

    }
    const changeDark = async (id) => {
        setDark(!dark)
        const user = {...userData.user, theme: !dark}
        try{
            await axios.post(`/api/v1/users/${id}`, user, configData)
            setUserData({...userData, user})
            setSnackMessage(MESSAGE.UPDATE_SETTINGS);
        }catch(err){
            console.log(err)
        }

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
        <AppBar position='static' className={classes.appBar}>
            <Snackbar open={snackMessage !== undefined} anchorOrigin={{vertical:'top', horizontal:'center'}} 
                variant="filled" autoHideDuration={3000} onClose={() => setSnackMessage(undefined)}>
                    <Alert severity="success">{snackMessage}</Alert>
            </Snackbar>
            <Toolbar className={classes.toolBar}>
                {userData.user && (<><IconButton className={classes.menuIcon} onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                    <List className={classes.list}>
                        <List>
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
                        </List>
                        <List>
                        <Divider />
                            <ListItem button onClick={openSettingsMenu}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </ListItem>
                            <a href="https://github.com/nick-dasto/travelapp/issues" target="_blank" 
                                rel="noopener noreferrer" className={classes.text}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <BugReportIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Report Bug"/>
                                </ListItem>
                            </a>
                            <a href="https://github.com/nick-dasto" target="_blank" 
                                rel="noopener noreferrer" className={classes.text}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <GitHubIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View More"/>
                                </ListItem>
                            </a>
                        </List>
                    </List>
                </Drawer></>)}
             <Typography variant='h4' className={classes.title}>{!userData.user ? 'Travel App' : `${userData.user.firstName}'s Travels`}</Typography>
                {userData.user && (<Button variant='contained' onClick={logout}>Log out</Button>)}
                <Dialog className={classes.menu} open={openSettings} onClose={closeSettingsMenu} fullWidth maxWidth='sm'>
                    <DialogTitle>Settings</DialogTitle>
                    <Divider />
                    <List className={classes.menu}>
                        <ListItem>
                            <ListItemText primary="Dark Mode" />
                            <Switch className={classes.switch} checked={dark} onChange={() => changeDark(!userData.user ? '':userData.user.id)}/> 
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Primary Color" />
                            <Select value={primary} onChange={(e) => changePrimary(e, !userData.user ? '':userData.user.id)}>
                                {colors.map((color) => (
                                    <MenuItem key={`primary ${color.muiName}`} value={color.muiName}>{color.text}</MenuItem>
                                ))}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Accent Color" />
                            <Select value={secondary} onChange={(e) => changeSecondary(e, !userData.user ? '':userData.user.id)}>
                            {colors.map((color) => (
                                    <MenuItem key={`secondary ${color.muiName}`} value={color.muiName}>{color.text}</MenuItem>
                                ))}
                            </Select>
                        </ListItem>
                        {/* <ListItem>
                            <ListItemText primary="Homepage" />
                            <Select value={homePage} onChange={changeHomePage}>
                                <MenuItem value={PAGES.BLOG}>Blogs</MenuItem>
                                <MenuItem value={PAGES.PLACES}>Places</MenuItem>
                                <MenuItem value={PAGES.FOOD}>Food and Drink</MenuItem>
                            </Select>
                        </ListItem> */}
                    </List>
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}
export default Nav
