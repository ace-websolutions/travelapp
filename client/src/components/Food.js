import React, {useContext} from 'react'
import {BlogContext} from '../context/BlogContext'
import {makeStyles, GridList, GridListTile, GridListTileBar, Fab, Container} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
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

function Food() {
    const classes = useStyles();
    const {foods, dispatchFoods} = useContext(BlogContext);
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
                    <Fab className={classes.fab} color="secondary" aria-label="add">
                    <AddIcon />
                  </Fab>
                  </Container>
    )
}

export default Food
