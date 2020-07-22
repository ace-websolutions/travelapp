import React, { useContext} from 'react'
import {BlogContext} from '../context/BlogContext'
import Blogs from './Blogs'
import Places from './Places'
import Food from './Food'
import { PAGES } from '../context/AppReducer'

function Body() {
    const {page} = useContext(BlogContext)

    switch(page) {
        case PAGES.BLOG:
            return (
                <Blogs />
            )
        case PAGES.PLACES:
            return (
                <Places />
            )
        case PAGES.FOOD:
            return (
                <Food />
            )
        default:
            return(
                <Places />
            )
    }
}

export default Body
