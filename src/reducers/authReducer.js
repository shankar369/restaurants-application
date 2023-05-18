import jwt from 'jwt-decode';

export const authReducer = (state,action) => {
    switch(action.type) {
        case 'SET_USER':
            console.log("-----set user")
            return {data: jwt(action.token), token:action.token}
        case 'REMOVE_USER':
            console.log("-----rem user")
            return null
        default:
            console.log("-----rem user",state)
            return state
    }
}