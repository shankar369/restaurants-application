import { useContext, useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { RestaurantContext } from "../contexts/restaurantContext";
import { getRestaurant } from "../apis/restaurantData";
import { AuthContext } from "../contexts/authContext";
import RestaurantContent from "../components/RestaurantContent";
import { UtilContext } from "../contexts/utilContext";


const Restaurant = ({match}) => {
    const {restaurant,setRestaurant} = useContext(RestaurantContext)
    const [ratings,setRatings] = useState([])
    const {user} = useContext(AuthContext)
    const {setLoading} = useContext(UtilContext)



    useEffect(() => {
        getRestaurant(match.params.restaurantId,setRestaurant,setRatings,user.token,setLoading)
        return () => {
            setRestaurant(null)
        }
    },[])
    console.log(restaurant,"----rsww")
    console.log()
    return (
        <div className="screen">
            {restaurant && <RestaurantContent isAdmin={user.data.isAdmin} restaurant={restaurant} ratings={ratings} setRatings={setRatings} />}
        </div>
    )
}

export default Restaurant;