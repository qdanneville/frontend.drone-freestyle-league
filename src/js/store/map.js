import { combineReducers } from "redux";

export const getUserGeoLocation = () => {
    return dispatch => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if (position.coords.longitude && position.coords.latitude) {
                    dispatch({ type: 'SET_USER_GEOLOCATION', payload: { lng: position.coords.longitude, lat: position.coords.latitude } })
                }
            });
        }
    }
}

const userGeoLocation = (state = null, action) => {
    switch (action.type) {
        case "SET_USER_GEOLOCATION":
            return action.payload
        default:
            return state
    }
}

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
    markers,
    userGeoLocation
});

export default mapReducer;