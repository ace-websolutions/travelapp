export const ACTIONS = {
    GET_BLOG:'get-blog',
    GET_PLACE:'get-place',
    GET_FOOD:'get-food',
    ADD_BLOG:'add-blog',
    ADD_PLACE:'add-place',
    ADD_FOOD:'add-food',
    EDIT_BLOG:'edit-blog',
    EDIT_PLACE:'edit-place',
    EDIT_FOOD:'edit-food',
    DELETE_BLOG:'delete-blog',
    DELETE_PLACE:'delete-place',
    DELETE_FOOD:'delete-food',
}
export const PAGES = {
    BLOG:'blog',
    PLACES:'places',
    FOOD:'food'
}

export const BlogReducer = (blogs, action) => {
    switch (action.type) {
        case ACTIONS.GET_BLOG:
            return {...blogs, blogs:action.payload}
        case ACTIONS.ADD_BLOG:
            return {...blogs, blogs:[ ...blogs.blogs, action.payload]};
        case ACTIONS.EDIT_BLOG:
            const newBlogs = {...blogs, blogs:[...blogs.blogs]};
            newBlogs.blogs[action.payload.index] = action.payload.blog
            return newBlogs
        case ACTIONS.DELETE_BLOG:
            return {...blogs, blogs:blogs.blogs.filter(blog => blog._id !== action.payload)}
        default:
            return blogs;
    }
}
export const PlaceReducer = (places, action) => {
    switch (action.type) {
        case ACTIONS.GET_PLACE:
            return {...places, places:action.payload}
        case ACTIONS.ADD_PLACE:
            return {...places, places:[action.payload, ...places.places]};
        case ACTIONS.EDIT_PLACE:
            const newPlaces = {...places, places:[...places.places]};
            newPlaces.places[action.payload.index] = action.payload.place
            return newPlaces
        case ACTIONS.DELETE_PLACE:
            return {...places, places:places.places.filter(place => place._id !== action.payload)}
        default:
            return places;
    }
}
export const FoodReducer = (foods, action) => {
    switch (action.type) {
        case ACTIONS.GET_FOOD:
            return {...foods, foods:action.payload}
        case ACTIONS.ADD_FOOD:
            return {...foods, foods:[action.payload, ...foods.foods]};
        case ACTIONS.EDIT_FOOD:
            const newFood = {...foods, foods:[...foods.foods]};
            newFood.foods[action.payload.index] = action.payload.food
            return newFood
        case ACTIONS.DELETE_FOOD:
            return {...foods, foods:foods.foods.filter(food => food._id !== action.payload)}
        default:
            return foods;
    }
}

export const INITIAL_BLOGS = {
    blogs: [],
    error: null
}
export const INITIAL_PLACES = {
    places: [],
    error: null

}
export const INITIAL_FOODS = {
    foods: [],
    error: null

}

export const TEST_BLOGS = [
    {
        title: "Toured the colosseum ", 
        date: "2020-09-21",
        description:"History was crazy, so many people died, rich people ran it, poor people gambled",
    },
    {
        title: "River Boat Ride",
        date:"2020-09-26",
        description:"Relaxing, saw some really cool houses, I even got to paddle a little!"
    },
    
]

export const TEST_PLACES = [
    {
        location:"Rome",
        date:"2020-09-21",
        timeSpent:"2 Days",
        rating: 85
    },
    {
        location:"Greece",
        date:"2020-09-26",
        timeSpent:"1 Days",
        rating: 65
    },
    
]

export const TEST_FOODS = [
    {
        image: 'https://source.unsplash.com/400x300/?food',
        name: "Salad",
        place:"Little Benny's, Rome"
    },
    {
        image: 'https://source.unsplash.com/400x300/?food',
        name: "Fish",
        place:"House Tavern, Greece"
    },
    
]
