import React, {useContext, useState} from 'react'
import {AppContext} from '../context/AppContext'
import {ACTIONS} from '../context/AppReducer'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Slider, makeStyles, Fab,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Backdrop, Snackbar  } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    buttonHover:{
        position: 'relative',
        '&hover > ButtonGroup':{
            opacity:1
        }
    },
    buttons:{
        position: 'absolute',
        left: -50,
        top: -50,
        //opacity: 0
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
}))
const emptyPlace = {
    location:"",
    date:"",
    timeSpent:"",
    rating: 50
}
function Places() {
    const classes = useStyles();
    const {places, dispatchPlaces, loading, setLoading, snack, setSnack, snackMessage, page} = useContext(AppContext);
    const [add, setAdd] = useState(false);
    const [newPlace, setNewPlace] = useState(emptyPlace)
    const [editing, setEditing] = useState(false)
    const [placeIndex, setPlaceIndex] = useState(0)

    const openNewPlace = () => {
        setAdd(true);
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
    const addPlace = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000)
        if(editing){
            dispatchPlaces({type: ACTIONS.EDIT_PLACE, payload: {id: placeIndex, blog:newPlace}})
        }else{
            dispatchPlaces({type: ACTIONS.ADD_PLACE, payload: newPlace })
        }
        console.log(newPlace)
        console.log(places)
        setNewPlace(emptyPlace);
        setEditing(false);
        setPlaceIndex(0);
        setAdd(false);
        setSnack(true)
    }
    const editPlace = (blog, index) => {
        setAdd(true);
        setNewPlace(blog)
        setEditing(true);
        setPlaceIndex(index);
    }
    const deletePlace = (id) =>{
         dispatchPlaces({type: ACTIONS.DELETE_PLACE, payload: id})
    }

    return (
        <>
                <Snackbar open={snack} variant="filled" autoHideDuration={3000} onClose={() => setSnack(false)}><Alert sevarity="success">{snackMessage(page)}</Alert></Snackbar>
        <Backdrop className={classes.backdrop} open={loading}> <CircularProgress /> </Backdrop>

        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow className={classes.topRow}>
                        <TableCell>Location</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time Spent</TableCell>
                        <TableCell>Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {places.map(place => (
                        <>
                        <TableRow key={place.date}>
                            <TableCell>{place.location}</TableCell>
                            <TableCell>{place.date}</TableCell>
                            <TableCell>{place.timeSpent}</TableCell>
                            <TableCell><Slider value={place.rating}   valueLabelDisplay="auto"
                            /></TableCell>
                        </TableRow>
                        </>
                    ))}

                </TableBody>
            </Table>
            <Fab className={classes.fab} onClick={openNewPlace} color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
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
             <Button variant='contained' color="secondary" onClick={addPlace}>{editing ? 'Save' : 'Add'}</Button>
         </DialogActions>
     </Dialog>
        </>
    )
}

export default Places
