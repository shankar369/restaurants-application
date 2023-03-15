import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";

const RestaurantEditForm = ({prevData, setShowForm, setRestaurants}) => {
    const restaurantId = prevData?._id
    const [name,setName] = useState(prevData.name);
    const [address,setAddress] = useState(prevData.address);
    const {user} = useContext(AuthContext)
    const [error,setError] = useState("")
    const {setLoading} = useContext(UtilContext)


    const updateUsersList = (updatedRestaurant) => {
        setRestaurants(restaurants => restaurants.map(restaurant => restaurant._id === updatedRestaurant._id ? updatedRestaurant: restaurant))
    }

    const submitHandler = async (e) => {
        console.log(user.token,"========tok")
        e.preventDefault();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          setLoading(true)
         const addedRestaurant = await axios.put(
            `/api/restaurants/${restaurantId}`,
            { name, address },
            config
          );
          updateUsersList(addedRestaurant.data.data)
          setShowForm(false)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };

    return (
        <div className="review-form user-form">
            <form onSubmit={submitHandler} className="form">
                <h1 className="form-title">Edit User</h1>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <input
                        type="text"
                        required
                        id="email"
                        placeholder="username"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <textarea rows="6" cols="50"
                        required
                        id="email"
                        placeholder="address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        tabIndex={2}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    save 
                </button>

            </form>
        </div>
    )
}

export default RestaurantEditForm