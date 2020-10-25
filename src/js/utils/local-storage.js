// ----------------    TOKEN   ------------------

export const setStorageToken = (token) => {
    return window.localStorage.setItem('token', JSON.stringify(token))
}

export const getStorageToken = () => {
    return JSON.parse(window.localStorage.getItem('token'))
}

export const clearToken = () => {
    window.localStorage.removeItem('token');
}

// ----------------    SETTINGS   ------------------

export const getStorageSettings = () => {
    return JSON.parse(window.localStorage.getItem('settings'))
}

export const setStorageSettings = (settings) => {
    return window.localStorage.setItem('settings', JSON.stringify(settings))
}

export const clearSettings = () => {
    window.localStorage.removeItem('settings');
}

