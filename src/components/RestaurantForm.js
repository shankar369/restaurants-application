import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";

const RestaurantForm = ({ setShowForm, setRestaurants}) => {
    const [name,setName] = useState("");
    const [reservation_required,setReservationRequired] = useState(0);
    const [address,setAddress] = useState("");
    const {user} = useContext(AuthContext)
    const [error,setError] = useState("")
    const {setLoading} = useContext(UtilContext)


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
         const addedRestaurant = await axios.post(
            "api/restaurants",
            { name, address, reservation_required },
            config
          );
          setRestaurants(restaurants => [...restaurants,addedRestaurant.data.data])
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
        <div className="review-form">
            <form onSubmit={submitHandler} className="form">
                <h2 className="form-title">Restaurant Details</h2>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                <input
                    type="text"
                    required
                    id="email"
                    placeholder="Restaurant Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    tabIndex={1}
                />
                </div>
                <div className="form-group">
                <textarea rows="6" cols="50" name="comment" form="usrform" tabIndex={2} value={address} placeholder="Address" onChange={e => setAddress(e.target.value)} />
                <div className="reservation">
                  <label>Reservation Required ?</label>
                  <input
                      type="checkbox"
                      required
                      id="email"
                      onChange={(e) => setReservationRequired(e.target.checked === true ? 1 : 0)}
                      value={name}
                      tabIndex={1}
                  />
                </div>
                
                </div>
                <button type="submit" className="btn btn-primary">
                    Add 
                </button>

            </form>
        </div>
    )
}

export default RestaurantForm