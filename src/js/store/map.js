import { combineReducers } from "redux";

const markers = (state = null, action) => {
    switch (action.type) {
        case "SET_MARKERS":
            return action.payload
        case "ADD_MARKER":
            return state.push(action.payload)
        default:
            return state
    }
}

const mapReducer = combineReducers({
    markers
});

export default mapReducer;