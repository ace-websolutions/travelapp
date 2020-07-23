import React, {createContext, useReducer, useState} from 'react'
import {BlogReducer, PlaceReducer, FoodReducer,TEST_BLOGS, TEST_PLACES, PAGES, TEST_FOODS} from './AppReducer'

export const BlogContext = createContext();


function BlogProvider({ children }) {
   const [blogs, dispatchBlogs] = useReducer(BlogReducer, TEST_BLOGS)
   const [places, dispatchPlaces] = useReducer(PlaceReducer, TEST_PLACES)
   const [foods, dispatchFoods] = useReducer(FoodReducer, TEST_FOODS)
   const [page, setPage] = useState(PAGES.BLOG)
   console.log(TEST_BLOGS);
   console.log(TEST_PLACES);


    return (
        <BlogContext.Provider value={{blogs, dispatchBlogs, places, dispatchPlaces, page, setPage, foods, dispatchFoods}}> 
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;
