import React, {useContext} from 'react'
import {BlogContext} from '../context/BlogContext'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Slider, makeStyles, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    topRow:{
        backgroundColor: theme.palette.primary.light
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
}))


function Places() {
    const classes = useStyles();
    const {places, dispatchPlaces} = useContext(BlogContext);

    return (
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
                <TableBody>
                    {places.map(place => (
                        <TableRow key={place.date}>
                            <TableCell>{place.location}</TableCell>
                            <TableCell>{place.date}</TableCell>
                            <TableCell>{place.timeSpent}</TableCell>
                            <TableCell><Slider defaultValue={place.rating}   valueLabelDisplay="auto"
                            /></TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            <Fab className={classes.fab} color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
        </TableContainer>
    )
}

export default Places
