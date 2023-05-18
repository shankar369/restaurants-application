import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";

const RestaurantDeleteForm = ({prevData, setShowForm, setRestaurants}) => {
    const restaurantId = prevData?._id
    const [name,setName] = useState(prevData.name);
    const [address,setAddress] = useState(prevData.address);
    const {setLoading} = useContext(UtilContext)

    const {user} = useContext(AuthContext)
    const [error,setError] = useState("")

    const updateRestaurantList = () => {
        setRestaurants(restaurants => restaurants.filter(restaurant => restaurant._id !== restaurantId))
    }

    const deleteHandler = async (e) => {
        e.preventDefault();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          setLoading(true)
         const data = await axios.delete(
            `/api/restaurants/${restaurantId}`,
            config
          );
          updateRestaurantList()
          setLoading(false)
          setShowForm(false)
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
            <form className="form">
                <h1 className="form-title">Delete Restaurant</h1>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <input
                        type="text"
                        required
                        id="email"
                        placeholder="username"
                        value={name}
                        disabled
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                <textarea rows="6" cols="50"
                        required
                        id="email"
                        placeholder="address"
                        value={address}
                        disabled
                        tabIndex={1}
                    />
                </div>

                <button onClick={deleteHandler}  type="button" className="btn btn-primary">
                    Delete 
                </button>

            </form>
        </div>
    )
}

export default RestaurantDeleteForm