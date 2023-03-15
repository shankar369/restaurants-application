import ReactStars from "react-stars"
import { MdDeleteForever } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";



const ReviewCard = ({review,isAdmin,setReviewId,setShowForm}) => {
    return (
        <div className="review-card">
            <div className="review-card-header">
                <h3>{review.user_name}</h3>
                <div>{new Date(review.time).toDateString()}</div>
            </div>
            
            <div className="card-rating">
                <ReactStars
                    edit={false}
                    count={5}
                    size={30}
                    value={review.rating}
                    color2={'black'} 
                />
            </div>
            <div className="card-address">{review.comment}</div>
                {isAdmin === 1 && <div className="review-card-icon" onClick={() => {
                    setShowForm(true)
                    setReviewId(review._id)
                }}><MdDeleteForever color="rgba(241, 50, 50, 0.938)" size="30px" /></div>}
            
        </div>
    )
}

export default ReviewCard;