import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from '../context/AppContext'
import { PAGES } from '../context/AppReducer'
import {makeStyles, GridList, GridListTile, GridListTileBar, Fab,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText, 
    Button, Backdrop, ButtonGroup, Menu, MenuItem, ListItemIcon, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
    buttons:{
        paddingRight: theme.spacing(1)
    },
    textField:{
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
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
const emptyFood = {
    image:"https://source.unsplash.com/400x300/?food",
    name:"",
    place:""
}
function Food() {
    const classes = useStyles();
    const { foods, loading, editFood, deleteFood, addFood, checkLoggedIn } = useContext(AppContext);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [prompt, setPrompt] = useState(false);
    const [promptTitle, setPromptTitle] = useState("");
    const [promptId, setPromptId] = useState('');
    const [newFood, setNewFood] = useState(emptyFood)
    const [editing, setEditing] = useState(false)
    const [foodIndex, setFoodIndex] = useState(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() =>{
        checkLoggedIn(PAGES.FOOD);
        // eslint-disable-next-line
    }, [])
   
    const openNewFood = () => {
        setAdd(true);
        setOpenMenu(false)
    }
    const openEditFood = () => {
        setEdit(true)
        setOpenMenu(false)
    }
    const closeEdit = () => {
        setEdit(false)
        setOpenMenu(false)
    }
    const closeNewFood = () => {
        setNewFood(emptyFood);
        setEditing(false);
        setFoodIndex(0);
        setAdd(false);
    }
    const handleImage= (e) => {
        setNewFood({...newFood, image: e.target.value})
    }
    const handleName= (e) => {
        setNewFood({...newFood, name: e.target.value})
    }
    const handleFood= (e) => {
        setNewFood({...newFood, place: e.target.value})
    }
    const submitFood = async () => {
        if(editing){
            await editFood(newFood._id, foodIndex, newFood)
            setEdit(false)
        }else{
            await addFood(newFood)
        }
        setNewFood(emptyFood);
        setEditing(false);
        setFoodIndex(0);
        setAdd(false);
    }
    const setupEditFood = (food, index) => {
        setAdd(true);
        setNewFood(food)
        setEditing(true);
        setFoodIndex(index);
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
            <GridList cellHeight={180} className={classes.root}>
                {foods.foods.map((food) => (
                    <GridListTile key={food._id}>
                        <img src={food.image}  alt="random food"/>
                        <GridListTileBar title={food.name} subtitle={food.place} actionIcon={
                            edit ? (
                                <ButtonGroup className={classes.buttons}>
                                <Button color='primary' variant="contained" onClick={() => setupEditFood(food, foods.foods.indexOf(food))}>
                                    Edit
                                </Button>
                                <Button color='secondary' variant="contained" onClick={() => handlePromptShow(food.name, food._id)}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                            ) : null
                        }/>
                </GridListTile>
                ))}
            </GridList>
            <Fab className={classes.fab} onClick={(event) => {
                    setOpenMenu(true)
                    setAnchorEl(event.currentTarget)
                }} color="secondary" aria-label="add">
                <MoreHorizIcon />
            </Fab>
            <Menu open={openMenu} onClose={() => setOpenMenu(false)} anchorEl={anchorEl}>
            <MenuItem onClick={edit ? closeEdit : openEditFood}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                {edit ? 'Close Edit': 'Edit'}
                </MenuItem>
                <MenuItem onClick={openNewFood}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                Add
                </MenuItem>
            </Menu>
            <Dialog open={add} onClose={closeNewFood}>
                <DialogTitle id="form-dialog-title">Add a New Food</DialogTitle>
                <DialogContent>
                    <TextField className={classes.textField} variant="outlined" label="Image" type='text' value={newFood.image} onChange={handleImage} fullWidth/>
                    <TextField className={classes.textField} variant="outlined" label="Name" type='name:' value={newFood.name} onChange={handleName} InputLabelProps={{
                    shrink: true,
                    }}/>
                    <TextField className={classes.textField} variant="outlined" label="Restaurant" type='text' value={newFood.place} onChange={handleFood}/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={closeNewFood}>Close</Button>
                    <Button variant='contained' color="secondary"onClick={submitFood}>{editing ? 'Save' : 'Add'}</Button>
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
                        deleteFood(promptId)
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

export default Food
