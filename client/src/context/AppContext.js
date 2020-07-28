import React, {createContext, useReducer, useState} from 'react'
import {BlogReducer, PlaceReducer, FoodReducer,INITIAL_BLOGS, INITIAL_PLACES, PAGES, INITIAL_FOODS, ACTIONS} from './AppReducer'
import axios from 'axios'

export const AppContext = createContext();


function AppProvider({ children }) {
   const [blogs, dispatchBlogs] = useReducer(BlogReducer, INITIAL_BLOGS)
   const [places, dispatchPlaces] = useReducer(PlaceReducer, INITIAL_PLACES)
   const [foods, dispatchFoods] = useReducer(FoodReducer, INITIAL_FOODS)
   const [page, setPage] = useState(PAGES.BLOG)
   const [loading, setLoading] = useState(true)
   const [snack, setSnack] = useState(false)

   const snackMessage = (currentPage) => {
       if(currentPage === PAGES.BLOG) return "Blog added!"
       if(currentPage === PAGES.PLACES) return "Location added!"
       if(currentPage === PAGES.FOOD) return "Post added!"
       console.log(currentPage)
   }
   const getBlogs = async () => {
       try{
           const res = await axios.get("http://localhost:5000/api/v1/blogs");
           dispatchBlogs({type: ACTIONS.GET_BLOG, payload: res.data.data});
       }catch(err){
           console.log(err);
       }
   }
   const addBlog = async (blog) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   
        try{
            const res = await axios.post('http://localhost:5000/api/v1/blogs', blog, config)
            dispatchBlogs({type: ACTIONS.ADD_BLOG, payload: res.data.data})
       }catch(err){
           console.log(err);
       }
   }
   const deleteBlog = async (id) =>{
       try {
           await axios.delete(`http://localhost:5000/api/v1/blogs/${id}`)
           dispatchBlogs({type:ACTIONS.DELETE_BLOG, payload: id})
       }catch(err){
        console.log(err);
    }
   }
   const editBlog = async (id, index, blog) => {
       const config = {
           headers: {
               'Content-Type':'application/json'
           }
       }
       try{
           await axios.patch(`http://localhost:5000/api/v1/blogs/${id}`, blog, config)
           dispatchBlogs({type:ACTIONS.EDIT_BLOG, payload:{index, blog}})
       }catch(err){
        console.log(err);
    }
   }
   const getPlaces = async () => {
       try{
           const res = await axios.get("http://localhost:5000/api/v1/places");
           dispatchPlaces({type: ACTIONS.GET_PLACE, payload: res.data.data});
       }catch(err){
           console.log(err);
       }
   }
   const addPlace = async (place) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   
        try{
            const res = await axios.post('http://localhost:5000/api/v1/places', place, config)
            dispatchPlaces({type: ACTIONS.ADD_PLACE, payload: res.data.data})
       }catch(err){
           console.log(err);
       }
   }
   const deletePlace = async (id) =>{
       try {
           await axios.delete(`http://localhost:5000/api/v1/places/${id}`)
           dispatchPlaces({type:ACTIONS.DELETE_PLACE, payload: id})
       }catch(err){
        console.log(err);
    }
   }
   const editPlace = async (id, index, place) => {
       const config = {
           headers: {
               'Content-Type':'application/json'
           }
       }
       try{
           await axios.patch(`http://localhost:5000/api/v1/places/${id}`, place, config)
           dispatchPlaces({type:ACTIONS.EDIT_PLACE, payload:{index, place}})
       }catch(err){
        console.log(err);
    }
   }

   const getFoods = async () => {
    try{
        const res = await axios.get("http://localhost:5000/api/v1/foods");
        dispatchFoods({type: ACTIONS.GET_FOOD, payload: res.data.data});
    }catch(err){
        console.log(err);
    }
}
const addFood = async (food) =>{
     const config = { 
         headers: {
             'Content-Type': 'application/json'
         }
     }   
     try{
         const res = await axios.post('http://localhost:5000/api/v1/foods', food, config)
         dispatchFoods({type: ACTIONS.ADD_FOOD, payload: res.data.data})
    }catch(err){
        console.log(err);
    }
}
const deleteFood = async (id) =>{
    try {
        await axios.delete(`http://localhost:5000/api/v1/foods/${id}`)
        dispatchFoods({type:ACTIONS.DELETE_FOOD, payload: id})
    }catch(err){
     console.log(err);
 }
}
const editFood = async (id, index, food) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    try{
        await axios.patch(`http://localhost:5000/api/v1/foods/${id}`, food, config)
        dispatchFoods({type:ACTIONS.EDIT_FOOD, payload:{index, food}})
    }catch(err){
     console.log(err);
 }
}

    return (
        <AppContext.Provider value={{blogs, dispatchBlogs, places, dispatchPlaces, page, setPage, 
        foods, dispatchFoods, loading, setLoading, snack, setSnack, snackMessage,
        getBlogs, addBlog, deleteBlog, editBlog,
        getPlaces, addPlace, deletePlace, editPlace,}}> 
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
