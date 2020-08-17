import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { PAGES } from '../context/AppReducer'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, 
    Paper, Slider, makeStyles, Fab, Dialog, DialogTitle, DialogContent, TextField, 
    DialogActions, DialogContentText, Button, Backdrop, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
    editLabel:{
        textAlign: 'right'
    },
    editButtons:{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    editButton:{
        marginRight: theme.spacing(1)
    },
    textField:{
        margin: theme.spacing(1),
    },
    topRow:{
        backgroundColor: theme.palette.primary.light
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    center: {
        display:'flex',
        justifyContent: "center",
        alignItems: 'center'
    },
    body:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },  
}))
const emptyPlace = {
    location:"",
    date:"",
    timeSpent:"",
    rating: 50
}
function Places() {
    const classes = useStyles();
    const { places, loading, editPlace, deletePlace, addPlace, checkLoggedIn } = useContext(AppContext);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [prompt, setPrompt] = useState(false);
    const [promptTitle, setPromptTitle] = useState("");
    const [promptId, setPromptId] = useState('');
    const [newPlace, setNewPlace] = useState(emptyPlace)
    const [editing, setEditing] = useState(false)
    const [placeIndex, setPlaceIndex] = useState(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() =>{
        checkLoggedIn(PAGES.PLACES);
        // eslint-disable-next-line
    }, [])


    const openNewPlace = () => {
        setAdd(true);
        setOpenMenu(false)
    }
    const openEditPlace = () => {
        setEdit(true)
        setOpenMenu(false)
    }
    const closeEdit = () => {
        setEdit(false)
        setOpenMenu(false)
    }
    const closeNewPlace = () => {
        setNewPlace(emptyPlace);
        setEditing(false);
        setPlaceIndex(0);
        setAdd(false);
    }
    const handleLocation= (e) => {
        setNewPlace({...newPlace, location: e.target.value})
    }
    const handleDate= (e) => {
        setNewPlace({...newPlace, date: e.target.value})
    }
    const handleTimeSpent= (e) => {
        setNewPlace({...newPlace, timeSpent: e.target.value})
    }
    const handleRating= (event, value) => {
        setNewPlace({...newPlace, rating: value})
        console.log(value)
    }
    const submitPlace = async () => {
        if(editing){
            await editPlace(newPlace._id, placeIndex, newPlace)
            setEdit(false)
        }else{
            await addPlace(newPlace)
        }
        setNewPlace(emptyPlace);
        setEditing(false);
        setPlaceIndex(0);
        setAdd(false);
    }
    const setupEditPlace = (place, index) => {
        setAdd(true);
        setNewPlace(place)
        setEditing(true);
        setPlaceIndex(index);
    }
    const handlePromptShow = (title, id) => {
        setPrompt(true);
        setPromptTitle(title);
        setPromptId(id);
    };
    
      const handlePromptClose = () => {
        setPrompt(false);
        setPromptTitle('');
        setPromptId('');
    };

    return (
        <Grid container className={classes.body}>
        <Grid item xs={1} sm={2} />
        <Grid container item xs={10} sm={8} className={classes.center}>
            <Backdrop className={classes.backdrop} open={loading}> <CircularProgress /> </Backdrop>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow className={classes.topRow}>
                            <TableCell>Location</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time Spent</TableCell>
                            <TableCell>Rating</TableCell>
                            {edit ? (<TableCell className={classes.editLabel}>Edit</TableCell>) : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {places.places.map(place => (
                            <>
                            <TableRow key={place._id}>
                                <TableCell>{place.location}</TableCell>
                                <TableCell>{place.date}</TableCell>
                                <TableCell>{place.timeSpent}</TableCell>
                                <TableCell><Slider value={place.rating}   valueLabelDisplay="auto"
                                /></TableCell>
                                {edit ? (<TableCell className={classes.editButtons}><Button className={classes.editButton} color='primary' variant="outlined" onClick={() => setupEditPlace(place, places.places.indexOf(place))}>Edit</Button>
                                <Button color='secondary' variant="outlined" onClick={() => handlePromptShow(place.location, place._id)}>Delete</Button></TableCell>) : null}
                            </TableRow>
                            </>
                        ))}

                    </TableBody>
                </Table>
                <Fab className={classes.fab} onClick={(event) => {
                    setOpenMenu(true)
                    setAnchorEl(event.currentTarget)
                }} color="secondary" aria-label="add">
                    <MoreHorizIcon />
                </Fab>
                <Menu open={openMenu} onClose={() => setOpenMenu(false)} anchorEl={anchorEl}>
                    <MenuItem onClick={edit ? closeEdit : openEditPlace}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            {edit ? 'Close Edit': 'Edit'}
                        </MenuItem>
                        <MenuItem onClick={openNewPlace}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                                Add
                        </MenuItem>
                </Menu>
            </TableContainer>
            <Dialog open={add} onClose={closeNewPlace}>
                <DialogTitle id="form-dialog-title">Add a New Blog</DialogTitle>
                <DialogContent>
                    <TextField className={classes.textField} variant="outlined" label="Location" type='text' value={newPlace.location} onChange={handleLocation}/>
                    <TextField className={classes.textField} variant="outlined" label="Date" type='date' value={newPlace.date} onChange={handleDate} InputLabelProps={{
                        shrink: true,
                        }}/>
                    <TextField className={classes.textField} variant="outlined" label="Time Spent" type='text' value={newPlace.timeSpent} onChange={handleTimeSpent} />
                        <Slider  onChange={handleRating} valueLabelDisplay="auto" />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={closeNewPlace}>Close</Button>
                    <Button variant='contained' color="secondary" onClick={submitPlace}>{editing ? 'Save' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={prompt} onClose={handlePromptClose}>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`Are you sure you want to delete
                ${promptTitle}?`}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant="outlined" onClick={handlePromptClose}>No</Button>
                <Button color="primary" variant="outlined" onClick={() => {
                    deletePlace(promptId)
                    handlePromptClose();
                    setEdit(false)
                    }}>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </Grid>
      <Grid item xs={1} sm={2} />
      </Grid>
    )
}

export default Places
