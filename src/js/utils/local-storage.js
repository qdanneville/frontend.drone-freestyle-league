export const setStorageToken = (token) => {
    return window.localStorage.setItem('token', JSON.stringify(token))
}

export const getStorageToken = () => {
    return JSON.parse(window.localStorage.getItem('token'))
}

export const clearToken = () => {
    window.localStorage.removeItem('token');
}