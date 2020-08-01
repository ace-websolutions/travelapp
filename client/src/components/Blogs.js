import React, {useContext, useState, useEffect} from 'react'
import {AppContext} from '../context/AppContext'
import { Grid, Card, CardHeader, CardContent, CardActions, Button, Fab, makeStyles,
Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText, Backdrop, Snackbar,
Menu, MenuItem, ListItemIcon  } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    date: {
        backgroundColor: "#fff"
    },
    card: {
        maxWidth: 'auto'
    },
    textField:{
        margin: theme.spacing(1),
    },
    bottom:{
        alignItems:'center',
        marginBottom: theme.spacing(6)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    },
}))
const emptyBlog = {
    title:"",
    date: "",
    description:""
}

function Blogs() {
    const classes = useStyles();
    const { blogs, loading, setLoading, snack, setSnack, snackMessageController, page,
    getBlogs, editBlog, deleteBlog, addBlog, snackMessage, setSnackMessage } = useContext(AppContext)
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [prompt, setPrompt] = useState(false);
    const [promptTitle, setPromptTitle] = useState("");
    const [promptId, setPromptId] = useState('');
    const [newBlog, setNewBlog] = useState(emptyBlog)
    const [editing, setEditing] = useState(false)
    const [blogIndex, setBlogIndex] = useState(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect( () =>{
        //loadPage();
    }, [])

    const loadPage = async () => {
        setLoading(true);
        await getBlogs();
        setLoading(false)
    }
    const openNewBlog = () => {
        setAdd(true);
        setOpenMenu(false)
    }
    const openEditBlog = () => {
        setEdit(true)
        setOpenMenu(false)
    }
    const closeEdit = () => {
        setEdit(false)
        setOpenMenu(false)
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
    const submitBlog = async () => {
        if(editing){
           await  editBlog(newBlog._id, blogIndex, newBlog)
           setSnackMessage(snackMessageController(page, 'edit'))
           setSnack(true)
           setEdit(false)
        }else{
            await addBlog(newBlog)
            setSnackMessage(snackMessageController(page, 'add'))
            setSnack(true)
        }
        setNewBlog(emptyBlog);
        setEditing(false);
        setBlogIndex(0);
        setAdd(false);
        setSnack(true);
    }
    const setupEditBlog = (blog, index) => {
        setAdd(true);
        setNewBlog({_id: blog._id, title: blog.title,
        date: blog.date, description:blog.description})
        setEditing(true);
        setBlogIndex(index);
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
        <>
            <Snackbar open={snack} anchorOrigin={{vertical:'top', horizontal:'center'}} variant="filled" autoHideDuration={3000} onClose={() => setSnack(false)}><Alert sevarity="success">{snackMessage}</Alert></Snackbar>
            <Backdrop className={classes.backdrop} open={loading}> <CircularProgress /> </Backdrop>
            <Grid container direction='column-reverse' spacing={2} className={classes.bottom}>
                {blogs.blogs.map(blog => (
                    <Grid item key={blog._id}>
                    <Card variant='outlined' className={classes.card}>
                        <CardHeader title={blog.title} subheader={blog.date}/>
                        <CardContent>{blog.description}</CardContent>
                        {edit ? (
                            <CardActions>
                            <Button color='primary' variant="outlined" onClick={() => setupEditBlog(blog, blogs.blogs.indexOf(blog))}>Edit</Button>
                            <Button  color='secondary' variant="outlined" onClick={() => handlePromptShow(blog.title, blog._id)}>Delete</Button>
                            </CardActions>
                        ) : null}

                    </Card>
                 </Grid>
               ))}           
            </Grid>
     <Fab className={classes.fab} onClick={(event) => {
                setOpenMenu(true)
                setAnchorEl(event.currentTarget)
            }} color="secondary" aria-label="add">
        <MoreHorizIcon />
      </Fab>
      <Menu open={openMenu} onClose={() => setOpenMenu(false)} anchorEl={anchorEl}>
          <MenuItem onClick={edit ? closeEdit : openEditBlog}>
              <ListItemIcon>
                  <EditIcon />
              </ListItemIcon>
        {edit ? 'Close Edit': 'Edit'}
          </MenuItem>
          <MenuItem onClick={openNewBlog}>
              <ListItemIcon>
                  <AddIcon />
              </ListItemIcon>
          Add
          </MenuItem>
      </Menu>
     <Dialog open={add} onClose={closeNewBlog}>
         <DialogTitle id="form-dialog-title">Add a New Blog</DialogTitle>
         <DialogContent>
             <TextField className={classes.textField} variant="outlined" label="Title" type='text' value={newBlog.title} onChange={handleTitle}/>
             <TextField className={classes.textField} variant="outlined" label="Date" type="date" value={newBlog.date} onChange={handleDate} InputLabelProps={{
              shrink: true,
            }}/>
             <TextField className={classes.textField} variant="outlined" label="Description" type='text' value={newBlog.description} onChange={handleDescription} multiline fullWidth/>
         </DialogContent>
         <DialogActions>
             <Button variant='contained' onClick={closeNewBlog}>Close</Button>
             <Button variant='contained' color="secondary"onClick={submitBlog}>{editing ? 'Save' : 'Add'}</Button>
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
                  deleteBlog(promptId)
                  handlePromptClose();
                  setSnackMessage(snackMessageController(page, "delete"))
                  setSnack(true)
                  setEdit(false)
                }}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
                </>
    )
}

export default Blogs
