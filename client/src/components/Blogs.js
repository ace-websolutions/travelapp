import React, {useContext, useState} from 'react'
import {AppContext} from '../context/AppContext'
import {ACTIONS} from '../context/AppReducer'
import { Grid, Card, CardHeader, CardContent, CardActions, Button, Fab, makeStyles,
Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: theme.spacing(1),
    },
    bottom:{
        marginBottom: theme.spacing(6)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
}))
const emptyBlog = {
    title:"",
    date:"",
    description:""
}

function Blogs() {
    const classes = useStyles();
    const { blogs, dispatchBlogs } = useContext(AppContext)
    const [add, setAdd] = useState(false);
    const [newBlog, setNewBlog] = useState(emptyBlog)
    const [editing, setEditing] = useState(false)
    const [blogIndex, setBlogIndex] = useState(0)
    
    const openNewBlog = () => {
        setAdd(true);
    }
    const closeNewBlog = () => {
        setNewBlog(emptyBlog);
        setEditing(false);
        setBlogIndex(0);
        setAdd(false);
    }
    const handleTitle= (e) => {
        setNewBlog({...newBlog, title: e.target.value})
    }
    const handleDate= (e) => {
        setNewBlog({...newBlog, date: e.target.value})
    }
    const handleDescription= (e) => {
        setNewBlog({...newBlog, description: e.target.value})
    }
    const addBlog = () => {
        if(editing){
            dispatchBlogs({type: ACTIONS.EDIT_BLOG, payload: {id: blogIndex, blog:newBlog}})
        }else{
            dispatchBlogs({type: ACTIONS.ADD_BLOG, payload: newBlog })
        }
        setNewBlog(emptyBlog);
        setEditing(false);
        setBlogIndex(0);
        setAdd(false);
    }
    const editBlog = (blog, index) => {
        setAdd(true);
        setNewBlog({title: blog.title,
        date: blog.date, description:blog.description})
        setEditing(true);
        setBlogIndex(index);
    }
    const deleteBlog = (id) =>{
         dispatchBlogs({type: ACTIONS.DELETE_BLOG, payload: id})
    }

    return (
        <>
    <Grid container spacing={2} className={classes.bottom}>
        {blogs.map(blog => (
            <Grid item key={blog.date}>
            <Card variant='outlined' className={classes.card}>
                <CardHeader title={blog.title} subheader={blog.date}/>
                <CardContent>{blog.description}</CardContent>
                <CardActions>
                <Button variant='contained' onClick={() => editBlog(blog, blogs.indexOf(blog))}>Edit</Button>
                <Button variant='contained' onClick={() => deleteBlog(blog.title)}>Delete</Button>
                </CardActions>
            </Card>
        </Grid>
        ))}            
        <Fab className={classes.fab} onClick={openNewBlog} color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
     </Grid>
     <Dialog open={add} onClose={closeNewBlog}>
         <DialogTitle id="form-dialog-title">Add a New Blog</DialogTitle>
         <DialogContent>
             <TextField className={classes.textField} variant="outlined" label="Title" type='text' value={newBlog.title} onChange={handleTitle}/>
             <TextField className={classes.textField} variant="outlined" label="Date" type='date' value={newBlog.date} onChange={handleDate} InputLabelProps={{
      shrink: true,
    }}/>
             <TextField className={classes.textField} variant="outlined" label="Description" type='text' value={newBlog.description} onChange={handleDescription} multiline fullWidth/>
         </DialogContent>
         <DialogActions>
             <Button variant='contained' onClick={closeNewBlog}>Close</Button>
             <Button variant='contained' color="secondary"onClick={addBlog}>{editing ? 'Save' : 'Add'}</Button>
         </DialogActions>
     </Dialog>
                </>
    )
}

export default Blogs
