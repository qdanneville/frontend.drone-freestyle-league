import api from './api'

export const getProfileFollowsProfile = (followProfileId) => {
    const request = api.get(`/profiles/follows/profile?profile=${followProfileId}`)
    return request.then(response => response.data > 0 ? true : false)
}

export const toggleFollowProfile = (followProfileSlug) => {
    const request = api.put(`/follow/${followProfileSlug}`)
    return request.then(response => response.data)
}

export const getProfileFollowersNumber = (profile) => {
    const request = api.get(`/profiles/slug/${profile}/followers?count=true`)
    return request.then(response => response.data)
}

export const getProfileFolloweesNumber = (profile) => {
    const request = api.get(`/profiles/slug/${profile}/followees?count=true`)
    return request.then(response => response.data)
}

export const getProfileFollowers = (profile) => {
    const request = api.get(`/profiles/slug/${profile}/followers`)
    return request.then(response => response.data)
}

export const getProfileFollowees = (profile) => {
    const request = api.get(`/profiles/slug/${profile}/followees`)
    return request.then(response => response.data)
}