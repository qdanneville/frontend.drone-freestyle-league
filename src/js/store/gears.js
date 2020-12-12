import { combineReducers } from "redux";


// --------------------------- PILOT GEAR -------------
// accessories
// drones
// batteries
// preferences

const accessories = (state = [], action) => {
    switch (action.type) {
        case "SET_ACCESSORIES":
            return action.payload
        case "CLEAR_ACCESSORIES":
            return []
        default:
            return state
    }
}

const drones = (state = [], action) => {
    switch (action.type) {
        case "SET_DRONES":
            return action.payload
        case "CLEAR_DRONES":
            return []
        default:
            return state
    }
}

const batteries = (state = [], action) => {
    switch (action.type) {
        case "SET_BATTERIES":
            return action.payload
        case "CLEAR_BATTERIES":
            return []
        default:
            return state
    }
}


// --------------------------- LOADING HANDLER -------------


const isLoading = (state = false, action) => {
    switch (action.type) {
        case "FETCH_ACCESSORIES":
        case "FETCH_BATTERIES":
        case "FETCH_DRONES":
            return true
        case "SET_ACCESSORIES":
        case "SET_BATTERIES":
        case "SET_DRONES":
            return false
        default:
            return state
    }
}

const GearReducer = combineReducers({
    accessories,
    drones,
    batteries,
    isLoading
});

export default GearReducer;