import React, {createContext, useReducer, useState} from 'react'
import {BlogReducer, PlaceReducer, TEST_BLOGS, TEST_PLACES, PAGES} from './AppReducer'

export const BlogContext = createContext();


function BlogProvider({ children }) {
   const [blogs, dispatch] = useReducer(BlogReducer, TEST_BLOGS)
   const [places, dispatchPlaces] = useReducer(PlaceReducer, TEST_PLACES)
   const [page, setPage] = useState(PAGES.BLOG)
   console.log(TEST_BLOGS);
   console.log(TEST_PLACES);


    return (
        <BlogContext.Provider value={{blogs, dispatch, places, dispatchPlaces, page, setPage}}> 
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;
