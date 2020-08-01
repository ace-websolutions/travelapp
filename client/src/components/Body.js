import React, { useContext} from 'react'
import {Route, Switch} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import Register from './Register'
import Login from './Login'
import Blogs from './Blogs'
import Places from './Places'
import Food from './Food'

function Body() {
    const {homePage} = useContext(AppContext)

    return(
        <Switch>
            <Route path="/" exact component={Blogs} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/places" component={Places} />
            <Route path="/foods" component={Food} />
        </Switch>
    )
}

export default Body
