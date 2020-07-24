export const ACTIONS = {
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
        case ACTIONS.ADD_BLOG:
            return [action.payload, ...blogs];
        case ACTIONS.EDIT_BLOG:
            const newBlogs = [...blogs];
            newBlogs[action.payload.id] = action.payload.blog
            return newBlogs
        case ACTIONS.DELETE_BLOG:
            return blogs.filter(blog => blog.title !== action.payload)
        default:
            return blogs;
    }
}
export const PlaceReducer = (places, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PLACE:
            return [action.payload, ...places];
        case ACTIONS.EDIT_PLACE:
            const newPlaces = [...places];
            newPlaces[action.payload.id] = action.payload.place
            return newPlaces
        case ACTIONS.DELETE_PLACE:
            return places.filter(place => place.location !== action.payload)
        default:
            return places;
    }
}
export const FoodReducer = (foods, action) => {
    switch (action.type) {
        case ACTIONS.ADD_FOOD:
            return [action.payload, ...foods];
        case ACTIONS.EDIT_FOOD:
            const newFoods = [...foods];
            newFoods[action.payload.id] = action.payload.food
            return newFoods
        case ACTIONS.DELETE_FOOD:
            return foods.filter(food => food.name !== action.payload)
        default:
            return foods;
    }
}

export const TEST_BLOGS = [
    {
        title: "Toured the colosseum ", 
        date: "9/21/2020",
        description:"History was crazy, so many people died, rich people ran it, poor people gambled",
    },
    {
        title: "River Boat Ride",
        date:"9/26/2020",
        description:"Relaxing, saw some really cool houses, I even got to paddle a little!"
    },
    
]

export const TEST_PLACES = [
    {
        location:"Rome",
        date:"9/21/2020",
        timeSpent:"2 Days",
        rating: 85
    },
    {
        location:"Greece",
        date:"9/26/2020",
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
