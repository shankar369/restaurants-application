import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";

const ReviewDeleteForm = ({reviewId, setShowForm, setReviews, error, setError}) => {
    const {user} = useContext(AuthContext)
    const {setLoading} = useContext(UtilContext)


    const updateReviewsList = () => {
        setReviews(reviews => reviews.filter(review => review._id !== reviewId))
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
            `/api/ratings/${reviewId}`,
            config
          );
          updateReviewsList()
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
            <form className="form">
                {error && <span className="error-message">{error}</span>}
                <center><h1>Are you sure ?</h1></center>

                <button onClick={deleteHandler}  type="button" className="btn btn-primary">
                    Delete 
                </button>

            </form>
        </div>
    )
}

export default ReviewDeleteForm