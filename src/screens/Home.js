import ReactStars from 'react-stars'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/authContext'
import { RestaurantContext } from '../contexts/restaurantContext'
import { getRestaurants } from "../apis/restaurantData";
import RestaurantCard from '../components/RestaurantCard';
import RestaurantForm from '../components/RestaurantForm';
import LightBox from '../components/LightBox';
import RestaurantEditForm from '../components/RestaurantEditForm';
import RestaurantDeleteForm from '../components/RestaurantDeleteForm';
import { UtilContext } from '../contexts/utilContext';

const Home = () => {
    
    const {restaurants,setRestaurants,setRestaurant} = useContext(RestaurantContext);
    const {user} = useContext(AuthContext)
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [prevData,setPrevData] = useState({})
    const {setLoading} = useContext(UtilContext)

    const handleModalClick = (e) => {
        if(e.target.className === "light-box"){
            setShowForm(false)
            setShowEditForm(false)
            setShowDeleteForm(false)
        }
        
    }


    useEffect(() => {
        getRestaurants(setRestaurants, user.token, setLoading);
    }, [])


    if(user === null) return <h1>Not logged in</h1>
    return (
        <div className="screen">
            <div className="restaurants flex-class">
                {
                    user.data.isAdmin === 1 &&(
                        <div className="add-restaurant"><button className="btn btn-primary" onClick={()=>{setShowForm(true)}}>Add Restaurant</button></div>

                    )
                }
                <div className="flex-class">
                    {restaurants?.length === 0 && <center><h1>No Restaurants available</h1></center> }
                    {restaurants?.map(restaurant => <RestaurantCard setShowEditForm={setShowEditForm} setShowDeleteForm={setShowDeleteForm} setPrevData={setPrevData} isAdmin={user.data.isAdmin} onClick={() => setRestaurant(null)} key={restaurant._id} restaurant={restaurant}/>)}
                </div>
            </div>

            {
                user.data.isAdmin === 1 && (
                    <>
                        <div onClick={e => handleModalClick(e)}>
                            {showForm &&<LightBox> <RestaurantForm setRestaurants={setRestaurants} setShowForm={setShowForm} /> </LightBox>}
                        </div>
                        <div onClick={e => handleModalClick(e)}>
                            {showEditForm &&<LightBox> <RestaurantEditForm setRestaurants={setRestaurants} setShowForm={setShowEditForm} prevData={prevData} /> </LightBox>}
                        </div>
                        <div onClick={e => handleModalClick(e)}>
                            {showDeleteForm &&<LightBox> <RestaurantDeleteForm setRestaurants={setRestaurants} setShowForm={setShowDeleteForm} prevData={prevData} /> </LightBox>}
                        </div>
                    </>
                )
            }
            
            
        </div>
    )
}

export default Home