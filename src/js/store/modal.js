import { combineReducers } from "redux";

const show = (state = null, action) => {
    switch (action.type) {
        case "SET_SHOW_MODAL":
            return true
        case "SET_HIDE_MODAL":
            return false
        default:
            return state
    }
}

const options = (state = null, action) => {
    switch (action.type) {
        case "SET_MODAL_OPTIONS":
            return action.payload
        case "CLEAR_MODAL_OPTIONS":
            return null
        default:
            return state
    }
}

const modalReducer = combineReducers({
    show,
    options
});

export default modalReducer;