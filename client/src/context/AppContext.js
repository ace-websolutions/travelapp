import React, {createContext, useReducer, useState } from 'react'
import { BlogReducer, PlaceReducer, FoodReducer,INITIAL_BLOGS, INITIAL_PLACES, 
    PAGES, INITIAL_FOODS, ACTIONS, MESSAGE } from './AppReducer'
import axios from 'axios'

export const AppContext = createContext();

function AppProvider({ children }) {
   const [blogs, dispatchBlogs] = useReducer(BlogReducer, INITIAL_BLOGS)
   const [places, dispatchPlaces] = useReducer(PlaceReducer, INITIAL_PLACES)
   const [foods, dispatchFoods] = useReducer(FoodReducer, INITIAL_FOODS)
//    const [page, setPage] = useState(PAGES.LOGIN)
//    const [homePage, setHomePage] = useState(PAGES.BLOG)
   const [loading, setLoading] = useState(false)
   const [snackMessage, setSnackMessage] = useState(undefined)
   const [userData, setUserData] = useState({token: undefined, user: undefined})

    const config = {
        headers: {
            "x-auth-token": userData.token || localStorage.getItem('x-auth-token')
        }
    }
    const configData = {
        headers: {
            'Content-Type':'application/json',
            "x-auth-token": userData.token || localStorage.getItem('x-auth-token')
        }
    }

    const checkLoggedIn = async (page) =>{
        try{
            let token = localStorage.getItem('x-auth-token')
            setUserData({...userData, token})
            if(token === null){
                localStorage.setItem("x-auth-token", "")
                token = ""
            }
            const tokenRes = await axios.post("/api/v1/users/tokenValid", null, {headers: {"x-auth-token":token}})
            if(tokenRes.data){
                const userRes = await axios.get("/api/v1/users/", {headers: {"x-auth-token":token}});
                setUserData({...userData, token, user: userRes.data});
                if(page === PAGES.BLOG) return getBlogs();
                if(page === PAGES.PLACES) return getPlaces();
                if(page === PAGES.FOOD) return getFoods();
            }
        }catch(err){
            console.log(err)
        }
    }
   const getBlogs = async () => {
       try{
           const res = await axios.get("/api/v1/blogs", config);
           dispatchBlogs({type: ACTIONS.GET_BLOG, payload: res.data});
       }catch(err){
           console.log(err);
       }
   }
   const addBlog = async (blog) =>{
        try{
            const res = await axios.post('/api/v1/blogs', blog, configData)
            dispatchBlogs({type: ACTIONS.ADD_BLOG, payload: res.data})
            setSnackMessage(MESSAGE.ADD_BLOG)
        }catch(err){
           console.log(err);
       }
   }
   const deleteBlog = async (id) =>{
       try {
           await axios.delete(`/api/v1/blogs/${id}`, config)
           dispatchBlogs({type:ACTIONS.DELETE_BLOG, payload: id})
           setSnackMessage(MESSAGE.DELETE_BLOG)
       }catch(err){
            console.log(err);
    }
   }
   const editBlog = async (id, index, blog) => {
       try{
           await axios.patch(`/api/v1/blogs/${id}`, blog, configData)
           dispatchBlogs({type:ACTIONS.EDIT_BLOG, payload:{index, blog}})
           setSnackMessage(MESSAGE.EDIT_BLOG)
        }catch(err){
            console.log(err);
    }
   }
   const getPlaces = async () => {
       try{
           const res = await axios.get("/api/v1/places", config);
           dispatchPlaces({type: ACTIONS.GET_PLACE, payload: res.data});
       }catch(err){
           console.log(err);
       }
   }
   const addPlace = async (place) =>{ 
        try{
            const res = await axios.post('/api/v1/places', place, configData)
            dispatchPlaces({type: ACTIONS.ADD_PLACE, payload: res.data})
            setSnackMessage(MESSAGE.ADD_PLACE)
       }catch(err){
           console.log(err);
       }
   }
   const deletePlace = async (id) =>{
       try {
           await axios.delete(`/api/v1/places/${id}`, config)
           dispatchPlaces({type:ACTIONS.DELETE_PLACE, payload: id})
           setSnackMessage(MESSAGE.DELETE_PLACE)
       }catch(err){
            console.log(err);
    }
   }
   const editPlace = async (id, index, place) => {
       try{
           await axios.patch(`/api/v1/places/${id}`, place, configData)
           dispatchPlaces({type:ACTIONS.EDIT_PLACE, payload:{index, place}})
           setSnackMessage(MESSAGE.EDIT_PLACE)
       }catch(err){
            console.log(err);
    }
   }

   const getFoods = async () => {
    try{
        const res = await axios.get("/api/v1/foods", config);
        dispatchFoods({type: ACTIONS.GET_FOOD, payload: res.data});
    }catch(err){
        console.log(err);
    }
}
const addFood = async (food) =>{
     try{
         const res = await axios.post('/api/v1/foods', food, configData)
         dispatchFoods({type: ACTIONS.ADD_FOOD, payload: res.data})
         setSnackMessage(MESSAGE.ADD_FOOD)
    }catch(err){
        console.log(err);
    }
}
const deleteFood = async (id) =>{
    try {
        await axios.delete(`/api/v1/foods/${id}`, config)
        dispatchFoods({type:ACTIONS.DELETE_FOOD, payload: id})
        setSnackMessage(MESSAGE.DELETE_FOOD)
    }catch(err){
        console.log(err);
 }
}
const editFood = async (id, index, food) => {
    try{
        await axios.patch(`/api/v1/foods/${id}`, food, configData)
        dispatchFoods({type:ACTIONS.EDIT_FOOD, payload:{index, food}})
        setSnackMessage(MESSAGE.EDIT_FOOD)
    }catch(err){
        console.log(err);
 }
}

    return (
        <AppContext.Provider value={{
            blogs, dispatchBlogs, places, dispatchPlaces, 
            foods, dispatchFoods, loading, setLoading,
            getBlogs, addBlog, deleteBlog, editBlog,
            getPlaces, addPlace, deletePlace, editPlace,
            getFoods, addFood, deleteFood, editFood, snackMessage, 
            setSnackMessage, userData, setUserData, checkLoggedIn, 
            configData
            }}> 
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
