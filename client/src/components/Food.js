import React, {useContext, useState} from 'react'
import {AppContext} from '../context/AppContext'
import {ACTIONS} from '../context/AppReducer'
import {makeStyles, GridList, GridListTile, GridListTileBar, Fab, Container,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
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
}))
const emptyFood = {
    image:"",
    name:"",
    place:""
}
function Food() {
    const classes = useStyles();
    const {foods, dispatchFoods} = useContext(AppContext);
    const [add, setAdd] = useState(false);
    const [newFood, setNewFood] = useState(emptyFood)
    const [editing, setEditing] = useState(false)
    const [foodIndex, setFoodIndex] = useState(0)
    
    const openNewFood = () => {
        setAdd(true);
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
    const handlePlace= (e) => {
        setNewFood({...newFood, place: e.target.value})
    }
    const addFood = () => {
        if(editing){
            dispatchFoods({type: ACTIONS.EDIT_FOOD, payload: {id: foodIndex, food:newFood}})
        }else{
            dispatchFoods({type: ACTIONS.ADD_FOOD, payload: newFood })
        }
        setNewFood(emptyFood);
        setEditing(false);
        setFoodIndex(0);
        setAdd(false);
    }
    const editFood = (food, index) => {
        setAdd(true);
        setNewFood({image: food.image,
        name: food.name, place:food.place})
        setEditing(true);
        setFoodIndex(index);
    }
    const deleteFood = (id) =>{
         dispatchFoods({type: ACTIONS.DELETE_FOOD, payload: id})
    }

    return (
        <Container>
        <GridList cellHeight={180} className={classes.root}>
            {foods.map((food) => (
                <GridListTile key={food.name}>
                    <img src={food.image} />
                    <GridListTileBar title={food.name} subtitle={food.place}/>
            </GridListTile>
            ))}
        </GridList>
                    <Fab className={classes.fab} onClick={openNewFood} color="secondary" aria-label="add">
                    <AddIcon />
                  </Fab>
                  <Dialog open={add} onClose={closeNewFood}>
         <DialogTitle id="form-dialog-title">Add a New Food</DialogTitle>
         <DialogContent>
             <TextField className={classes.textField} variant="outlined" label="Image" type='text' value={newFood.image} onChange={handleImage}/>
             <TextField className={classes.textField} variant="outlined" label="Date" type='name:' value={newFood.name} onChange={handleName} InputLabelProps={{
      shrink: true,
    }}/>
             <TextField className={classes.textField} variant="outlined" label="Description" type='text' value={newFood.place} onChange={handlePlace} multiline fullWidth/>
         </DialogContent>
         <DialogActions>
             <Button variant='contained' onClick={closeNewFood}>Close</Button>
             <Button variant='contained' color="secondary"onClick={addFood}>{editing ? 'Save' : 'Add'}</Button>
         </DialogActions>
     </Dialog>
                  </Container>
    )
}

export default Food
