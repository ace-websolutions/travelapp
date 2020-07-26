import React, {createContext, useReducer, useState} from 'react'
import {BlogReducer, PlaceReducer, FoodReducer,TEST_BLOGS, TEST_PLACES, PAGES, TEST_FOODS} from './AppReducer'

export const AppContext = createContext();


function AppProvider({ children }) {
   const [blogs, dispatchBlogs] = useReducer(BlogReducer, TEST_BLOGS)
   const [places, dispatchPlaces] = useReducer(PlaceReducer, TEST_PLACES)
   const [foods, dispatchFoods] = useReducer(FoodReducer, TEST_FOODS)
   const [page, setPage] = useState(PAGES.BLOG)
   const [loading, setLoading] = useState(false)
   const [snack, setSnack] = useState(false)

   const snackMessage = (currentPage) => {
       if(currentPage === PAGES.BLOG) return "Blog added!"
       if(currentPage === PAGES.PLACES) return "Location added!"
       if(currentPage === PAGES.FOOD) return "Post added!"
       console.log(currentPage)
   }
//    console.log(TEST_BLOGS);
//    console.log(TEST_PLACES);


    return (
        <AppContext.Provider value={{blogs, dispatchBlogs, places, dispatchPlaces, page, setPage, 
        foods, dispatchFoods, loading, setLoading, snack, setSnack, snackMessage}}> 
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
