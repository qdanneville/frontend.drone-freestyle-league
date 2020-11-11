import { combineReducers } from "redux";


// --------------------------- MAP SPOTS -------------
// public spots
// friends spots
// pilot spots

const publicSpots = (state = [], action) => {
    switch (action.type) {
        case "SET_PUBLIC_SPOTS":
            return action.payload
        default:
            return state
    }
}

const friendsSpots = (state = [], action) => {
    switch (action.type) {
        case "SET_FRIENDS_SPOTS":
            return action.payload
        default:
            return state
    }
}

//This one is used in mapSpots
//A profile object is attached to those spots
//Need to construct a spot popup
const pilotSpots = (state = [], action) => {
    switch (action.type) {
        case "SET_PILOT_SPOTS":
            return action.payload
        default:
            return state
    }
}

// --------------------------- USER SPOTS -------------

//my spots
//current creation spot

//This one is used in my-spots page
//Not exactly the same use than mySpots
const mySpots = (state = [], action) => {
    switch (action.type) {
        case "SET_MY_SPOTS":
            return action.payload
        default:
            return state
    }
}

const currentSpotCreation = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_SPOT":
            return action.payload
        default:
            return state
    }
}


// --------------------------- LOADING HANDLER -------------


const isLoading = (state = false, action) => {
    switch (action.type) {
        case "FETCH_PUBLIC_SPOTS":
        case "FETCH_MY_SPOTS":
        case "FETCH_FRIENDS_SPOTS":
        case "FETCH_PILOT_SPOTS":
            return true
        case "SET_PUBLIC_SPOTS":
        case "SET_MY_SPOTS":
        case "SET_FRIENDS_SPOTS":
        case "SET_CURRENT_SPOT":
        case "SET_PILOT_SPOTS":
            return false
        default:
            return state
    }
}

const spotsReducer = combineReducers({
    currentSpotCreation,
    publicSpots,
    friendsSpots,
    pilotSpots,
    mySpots,
    isLoading
});

export default spotsReducer;