import { POST } from './core.js'

export const getEndpointWithPrefix = (endpoint) => {
    return `auth/${endpoint}`
}

export const signIn = (cred) => {
    const endpoint =  getEndpointWithPrefix('sign-in');
    return POST(endpoint, cred)
}

export const signUp = (cred) => {
    const endpoint =  getEndpointWithPrefix('sign-up');
    return POST(endpoint, cred)
}