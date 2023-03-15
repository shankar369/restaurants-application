import { Link } from 'react-router-dom';
import ReactStars from 'react-stars'
import "./RestaurantCard.css"
import { MdDeleteForever, MdEditNote } from "react-icons/md";


const RestaurantCard = ({restaurant,setPrevData,isAdmin,
                        setShowEditForm, setShowDeleteForm
}) => {
    return (
            <div className="card flex-class">
                <div className="card-content">
                    <Link to={`/restaurants/${restaurant._id}`} style={{ textDecoration: 'none' }}>
                        <h2 className="card-title">{restaurant.name}</h2>
                    </Link>
                    <div className="card-rating">
                        <ReactStars
                            edit={false}
                            count={5}
                            size={50}
                            value={restaurant.avg_rating}
                            color2={'black'} 
                        />
                    </div>
                </div>
                
                {isAdmin === 1 && 
                    <div className="card-icons">
                        <MdEditNote onClick={() => {
                                setPrevData(restaurant)
                                setShowEditForm(true)
                            }} color="black" size="30px" />
                        <MdDeleteForever onClick={() => {
                                                            setPrevData(restaurant) 
                                                            setShowDeleteForm(true)
                                                        }
                            } color="rgba(241, 50, 50, 0.938)" size="30px" />
                    </div>
                }
            </div>
    )
}

export default RestaurantCard;