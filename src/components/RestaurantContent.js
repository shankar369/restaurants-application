import { useState, useContext } from "react";
import ReactStars from "react-stars";
import LightBox from "./LightBox";
import ReviewCard from "./ReviewCard";
import ReviewDeleteForm from "./ReviewDeleteForm";
import ReviewForm from "./ReviewForm";
import { AuthContext } from "../contexts/authContext";
import "./RestaurantContent.css"

const RestaurantContent = ({ isAdmin, restaurant, ratings, setRatings }) => {
  const [showForm, setShowForm] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [showReviewDeleteForm, setShowReviewDeleteForm] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [error, setError] = useState(null);
  const [newOne, setNewOne] = useState(
    restaurant?.top_rating === -1 ? true : false
  );
  const handleModalClick = (e) => {
    if (e.target.className === "light-box") {
      setShowForm(false);
      setShowReviewDeleteForm(false);
    }
  };
  const updateRatingMath = (rating) => {
    if (restaurant.top_rating === -1) restaurant.top_rating = rating;
    if (restaurant.lowest_rating === -1) restaurant.lowest_rating = rating;
    if (restaurant.top_rating < rating) restaurant.top_rating = rating;
    if (restaurant.lowest_rating > rating) restaurant.lowest_rating = rating;
    if (restaurant.total_ratings === 0) {
      restaurant.avg_rating = rating;
    } else {
      restaurant.avg_rating = (parseFloat(restaurant.avg_rating) + rating) / 2;
    }
    restaurant.total_ratings = restaurant.total_ratings + 1;
    setNewOne(false);
  };
  return (
    <div className="flex-class">
      <div className="restaurant-info">
        <div className="restaurant-image-wrapper">
          <div className="restaurant-img-main">
            <img src={restaurant.image} alt="restaurant image" />
          </div>
          <div className="restaurant-header">
            <h1>{restaurant.name}</h1>
            <h5>{restaurant.address}</h5>
            <div className="main-ratings">
          {!newOne && (
            <div className="main-ratings-wrapper">
              <div className="main-rating">
                <ReactStars
                  edit={false}
                  count={5}
                  size={30}
                  value={restaurant.top_rating}
                  color2={"black"}
                />
                <h3>TOP RATING <span> {restaurant.top_rating} </span></h3>
              </div>
              <div className="main-rating">
                <ReactStars
                  edit={false}
                  count={5}
                  size={30}
                  value={restaurant.avg_rating}
                  color2={"black"}
                />
                <h3>AVG RATING <span> {restaurant.avg_rating.toFixed(1)} </span></h3>
              </div>

              <div className="main-rating">
                <ReactStars
                  edit={false}
                  count={5}
                  size={30}
                  value={restaurant.lowest_rating}
                  color2={"black"}
                />
                <h3>LOWEST RATING <span>{restaurant.lowest_rating} </span> </h3>
              </div>
            </div>
          )}
          </div>
          </div>
        </div>
        
        
      </div>
      <div className="restaurant-reviews shadow">
        <div className="reviews-header">
          <h2>Reviews</h2>
          {!user && <h5>Please login to add your review</h5>}
          {user && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Add Your Review
            </button>
          )}
        </div>
        <div className="reviews">
          {newOne && (
            <center>
              <h2>No reviews yet</h2>
            </center>
          )}
          {ratings &&
            ratings.map((review) => (
              <ReviewCard
                setShowForm={setShowReviewDeleteForm}
                setReviewId={setReviewId}
                isAdmin={isAdmin}
                key={review._id}
                review={review}
              />
            ))}
        </div>
      </div>
      <div onClick={(e) => handleModalClick(e)}>
        {showForm && (
          <LightBox>
            {" "}
            <ReviewForm
              updateRatingMath={updateRatingMath}
              restaurant_id={restaurant._id}
              setRatings={setRatings}
              setShowForm={setShowForm}
            />{" "}
          </LightBox>
        )}
      </div>

      <div onClick={(e) => handleModalClick(e)}>
        {showReviewDeleteForm && (
          <LightBox>
            {" "}
            <ReviewDeleteForm
              reviewId={reviewId}
              setShowForm={setShowReviewDeleteForm}
              setReviews={setRatings}
              error={error}
              setError={setError}
            />{" "}
          </LightBox>
        )}
      </div>
    </div>
  );
};

export default RestaurantContent;
