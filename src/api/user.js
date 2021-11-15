import { GET } from './core.js'

export const getEndpointWithPrefix = (endpoint) => {
    return `user/${endpoint}`
}

export const searchByUsername = (username, auth) => {
    const endpoint =  getEndpointWithPrefix(`searchUserByUserName?username=${username}`)
    return GET(endpoint, auth)
}