import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";


const apiUrl = "https://restaurants-api-u5ww.onrender.com";

const UserDeleteForm = ({prevData, setShowForm, setUsers}) => {
    const userId = prevData?._id
    const [username,setUsername] = useState(prevData.username);
    const [email,setEmail] = useState(prevData.email);
    const [admin,setAdmin] = useState(prevData.admin);
    const {user} = useContext(AuthContext)
    const [error,setError] = useState("")
    const {setLoading} = useContext(UtilContext)


    const updateUsersList = () => {
        setUsers(users => users.filter(user => user._id !== userId))
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
            `${apiUrl}/api/users/${userId}`,
            config
          );
          updateUsersList()
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
                <h1 className="form-title">Delete User</h1>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <input
                        type="text"
                        disabled
                        id="email"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        disabled
                        id="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        required
                        id="email"
                        placeholder="is admin ?"
                        onChange={(e) => setAdmin(e.target.value)}
                        value={admin}
                        tabIndex={1}
                    />
                </div>
                <button onClick={deleteHandler}  type="button" className="btn btn-primary">
                    Delete 
                </button>

            </form>
        </div>
    )
}

export default UserDeleteForm