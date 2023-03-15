import {useContext} from 'react'
import "./Navbar.css"
import { AuthContext } from '../contexts/authContext'
import { useHistory } from "react-router";
import logo from "../static/images/logo.png"


function Navbar() {
    const history = useHistory()
    const {user,dispatch} = useContext(AuthContext)
    console.log(user,"----------user")
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        dispatch({type:'REMOVE_USER'})
        history.push("/")
    }
    return (
        <nav className='navbar'>
            <div className="image-wrapper">
                <img src={logo} alt="Restaurants" />
            </div>
            {user && <button className="btn btn-primary" onClick={handleLogout}>logout</button>}
            {/* {user?.data?.isAdmin === 1 && <h1>hello admin !</h1>} */}
        </nav>
    )
}

export default Navbar
