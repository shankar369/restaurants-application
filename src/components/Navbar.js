import {useContext} from 'react'
import "./Navbar.css"
import { AuthContext } from '../contexts/authContext'
import { useHistory } from "react-router";
import {Link} from 'react-router-dom'
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
                <Link to='/'>
                    <img src={logo} alt="Restaurants" />
                </Link>
            </div>
            {user && <button className="btn btn-primary" onClick={handleLogout}>logout</button>}
            {!user && <Link to='/login'><button className="btn btn-primary" onClick={handleLogout}>Login</button></Link>}
            {/* {user?.data?.isAdmin === 1 && <h1>hello admin !</h1>} */}
        </nav>
    )
}

export default Navbar
