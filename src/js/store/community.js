import { combineReducers } from "redux";

const followers = (state = [], action) => {
    switch (action.type) {
        case "SET_FOLLOWERS":
            return action.payload
        case "CLEAR_FOLLOWERS":
            return []
        default:
            return state
    }
}

const followees = (state = [], action) => {
    switch (action.type) {
        case "SET_FOLLOWEES":
            return action.payload
        case "CLEAR_FOLLOWEES":
            return []
        default:
            return state
    }
}

const isLoading = (state = null, action) => {
    switch (action.type) {
        case "FETCH_FOLLOWERS":
        case "FETCH_FOLLOWEES":
            return true
        case "SET_FOLLOWEERS":
        case "CLEAR_FOLLOWERS":
        case "SET_FOLLOWEES":
        case "CLEAR_FOLLOWEES":
            return false
        default:
            return state
    }
}

const communityReducer = combineReducers({
    followers,
    followees,
    isLoading
});

export default communityReducer;