// {
//     auth {
//         token:null,
//         user:null,
//         isLoading: false
//         appInitialized:false
//     }
// }

import { combineReducers } from "redux";
import api, { addAuth } from '../utils/api'
import { setStorageToken, getStorageToken } from '../utils/local-storage'

export const fetchUser = () => {
    return dispatch => {
        dispatch({ type: "FETCH_USER" })

        const token = getStorageToken();

        if (!token) return dispatch({ type: "APP_INITIALIZED" })

        addAuth(token);

        api
            .get('users/me')
            .then(response => {
                let user = response.data.data.user

                if (user) {
                    dispatch({ type: "SET_AUTH_USER", payload: user })
                }
                if (token) dispatch({ type: "SET_AUTH_TOKEN", payload: token })
            })
            .finally(() => {
                dispatch({ type: "APP_INITIALIZED" })
            })
    }
}

export const doLogin = (username, password) => {
    return dispatch => {
        dispatch({ type: "DOING_LOGIN" })

        return api
            .post('/users/authenticate', { username, password })
            .then(response => {
                let result = response.data.data;

                if (result && result.token) {
                    addAuth(result.token);
                    setStorageToken(result.token);
                    dispatch({ type: "SET_AUTH_TOKEN", payload: result.token })
                }
                if (result && result.user) {
                    dispatch({ type: "SET_AUTH_USER", payload: result.user })
                    dispatch({ type: "APP_INITIALIZED" })
                }
            })
            .catch(error => {
                dispatch({ type: "LOGIN_FAILED" })

                if (error.response.data.message) throw error.response.data.message

                throw new Error({ message: "Login failed, retry" });
            })
    }
}

const token = (state = null, action) => {
    switch (action.type) {
        case "SET_AUTH_TOKEN":
            return action.payload;
        case "CLEAR_AUTH_TOKEN":
            return null;
        default:
            return state;
    }
}

const user = (state = null, action) => {
    switch (action.type) {
        case "SET_AUTH_USER":
            return action.payload;
        case "CLEAR_AUTH_USER":
            return null;
        default:
            return state;
    }
}

const isLoading = (state = null, action) => {
    switch (action.type) {
        case "DOING_LOGIN":
            return true;
        case "FETCH_STORAGE":
            return true;
        case "FETCH_USER":
            return true;
        case "LOGIN_FAILED":
        case "SET_AUTH_USER":
        case "SET_AUTH_TOKEN":
        case "SET_STORAGE":
        case "APP_INITIALIZED":
            return false;
        default:
            return state;
    }
};

const appInitialized = (state = false, action) => {
    switch (action.type) {
        case "FETCH_USER":
            return state;
        case "APP_INITIALIZED":
            return true;
        default:
            return state;
    }
};


const authReducer = combineReducers({
    token,
    user,
    isLoading,
    appInitialized
});

export default authReducer;