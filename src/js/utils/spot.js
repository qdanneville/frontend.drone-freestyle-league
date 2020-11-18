import api from './api'

export const toggleLikeSpot = (spotId, profileId) => {
    const request = api.post(`/profile-likes-spots/`, { profile: profileId, spot: spotId })
    return request.then(response => response.data)
}

export const getSpotLikes = (spotId) => {
    const request = api.get(`/profile-likes-spots/count/?spot=${spotId}`)
    return request.then(response => response.data)
}

export const getUserHasLikedThisSpot = (spotId, profileId) => {
    const request = api.get(`/profile-likes-spots/count/?spot=${spotId}&profile=${profileId}`)
    return request.then(response => response.data > 0 ? true : false)
}