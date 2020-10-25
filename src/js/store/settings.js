import { combineReducers } from "redux";
import { getStorageSettings, setStorageSettings } from '../utils/local-storage'


export const setSettings = (settings) => {
    return dispatch => {

        setStorageSettings(settings);

        //NAVCOLOR
        if (settings && settings.navColor) return dispatch({ type: 'CHANGE_NAV_COLOR', payload: settings.navColor })
    }
}

export const fetchSettings = () => {
    return dispatch => {
        const settings = getStorageSettings();

        if (settings && settings.navColor) return dispatch({ type: 'CHANGE_NAV_COLOR', payload: settings.navColor })
    }
}

const navColor = (state = null, action) => {
    switch (action.type) {
        case "CHANGE_NAV_COLOR":
            return action.payload
        default:
            return state

    }
}

const settingsReducer = combineReducers({
    navColor,
});

export default settingsReducer;