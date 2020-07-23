export const ACTIONS = {
    ADD_BLOG:'add-blog',
    ADD_PLACE:'add-place',
}
export const PAGES = {
    BLOG:'blog',
    PLACES:'places',
    FOOD:'food'
}

export const BlogReducer = (blogs, action) => {
    switch (action.type) {
        case ACTIONS.ADD_BLOG:
            return [
                ...blogs, action.payload
            ];
        default:
            return blogs;
    }
}
export const PlaceReducer = (places, action) => {
    switch (action.type) {
        case PAGES.BLOG:
            return [
                ...places, action.payload
            ];
        default:
            return places;
    }
}
export const FoodReducer = (foods, action) => {
    switch (action.type) {
        case PAGES.BLOG:
            return [
                ...foods, action.payload
            ];
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
    {
        title: "Toured the colosseum ", 
        date: "9/21/2020",
        description:"History was crazy, so many people died, rich people ran it, poor people gambled",
    },
    {
        title: "River Boat Ride",
        date:"9/26/2020",
        description:"Relaxing, saw some really cool houses, I even got to paddle a little!"
    }
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
