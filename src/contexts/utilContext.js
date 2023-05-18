import React, { createContext, useState } from 'react';

export const UtilContext = createContext();

const UtilContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)

    return (
        <UtilContext.Provider value={{loading,setLoading}}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilContextProvider;

