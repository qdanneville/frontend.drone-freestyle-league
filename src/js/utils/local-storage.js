// ----------------    TOKEN   ------------------

export const setStorageToken = (token) => {
    return window.localStorage.setItem('token', JSON.stringify(token))
}

export const setStorageProfile = (profile) => {
    return window.localStorage.setItem('profile', JSON.stringify(profile))
}

export const getStorageToken = () => {
    return JSON.parse(window.localStorage.getItem('token'))
}

export const getStorageProfile = () => {
    return JSON.parse(window.localStorage.getItem('profile'))
}

export const clearToken = () => {
    window.localStorage.removeItem('token');
}

export const clearProfile = () => {
    window.localStorage.removeItem('profile');
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

