import React, {useContext} from 'react'
import {BlogContext} from '../context/BlogContext'
import { Grid, Card, CardHeader, CardContent, CardActions, Button, Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    bottom:{
        marginBottom: theme.spacing(6)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
}))

function Blogs() {
    const classes = useStyles();
    const { blogs, dispatch } = useContext(BlogContext)

    return (
    <Grid container spacing={2} className={classes.bottom}>
        {blogs.map(blog => (
            <Grid item key={blog.date}>
            <Card variant='outlined' className={classes.card}>
                <CardHeader title={blog.title} subheader={blog.date}/>
                <CardContent>{blog.description}</CardContent>
                <CardActions>
                <Button variant='contained'>Edit</Button>
                </CardActions>
            </Card>
        </Grid>
        ))}            
        <Fab className={classes.fab} color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
     </Grid>
    )
}

export default Blogs
