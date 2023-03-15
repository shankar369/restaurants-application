import React, { createContext, useState } from 'react';

export const RestaurantContext = createContext();

const RestaurantContextProvider = ({children}) => {
    const [restaurants, setRestaurants] = useState(null)
    const [restaurant, setRestaurant] = useState(null)

    return (
        <RestaurantContext.Provider value={{restaurants,restaurant,setRestaurants,setRestaurant}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider;

