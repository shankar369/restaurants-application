import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import "./RestaurantCard.css";
import { MdDeleteForever, MdEditNote } from "react-icons/md";

const RestaurantCard = ({
  restaurant,
  setPrevData,
  isAdmin,
  setShowEditForm,
  setShowDeleteForm,
}) => {
  return (
    <div className="card flex-class">
      <Link
        to={`/restaurants/${restaurant._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="card-content">
          <div className="card-img">
            <img src={restaurant.image} alt="random" />
          </div>

          <div className="card-rating">
            <h3 className="card-title">{restaurant.name}</h3>
            <ReactStars
              edit={false}
              count={5}
              size={30}
              value={restaurant.avg_rating}
              color2={"black"}
            />
          </div>
        </div>

        {isAdmin === 1 && (
          <div className="card-icons">
            <MdEditNote
              onClick={() => {
                setPrevData(restaurant);
                setShowEditForm(true);
              }}
              color="black"
              size="30px"
            />
            <MdDeleteForever
              onClick={() => {
                setPrevData(restaurant);
                setShowDeleteForm(true);
              }}
              color="rgba(241, 50, 50, 0.938)"
              size="30px"
            />
          </div>
        )}
      </Link>
    </div>
  );
};

export default RestaurantCard;
