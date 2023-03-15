import { useState, useContext } from "react"
import ReactStars from "react-stars";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";

const ReviewForm = ({restaurant_id, setShowForm, setRatings,updateRatingMath}) => {
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");
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
          console.log(user.data.username,"-=-=-=-=-=--")
          setLoading(true)
         const addedRating = await axios.post(
            `/api/ratings/${restaurant_id}`,
            { rating, comment, user_id: user.data.id, user_name: user.data.username },
            config
          );
          setRatings(ratings => [addedRating.data.data,...ratings])
          updateRatingMath(rating)
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
                <h1 className="form-title">Review</h1>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                <ReactStars
                    count={5}
                    size={50}
                    value={rating}
                    color2={'black'} 
                    onChange={r => setRating(r)}
                />
                </div>
                <div className="form-group">
                <textarea rows="6" cols="50" name="comment" form="usrform" tabIndex={2} value={comment} placeholder={"please provide a comment"} onChange={e => setComment(e.target.value)} />

                </div>
                <button type="submit" className="btn btn-primary">
                    Submit 
                </button>

            </form>
        </div>
    )
}

export default ReviewForm