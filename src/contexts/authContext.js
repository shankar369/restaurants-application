import React, { createContext, useReducer } from 'react';
import jwt from 'jwt-decode'
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, dispatch] = useReducer( authReducer, null, () => {
        const token = localStorage.getItem("authToken");
        return token ? {data:jwt(token),token} : null
    })

    return (
        <AuthContext.Provider value={{user,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

