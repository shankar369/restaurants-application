import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { UtilContext } from "../contexts/utilContext";

const UserEditForm = ({prevData, setShowForm, setUsers}) => {
    const userId = prevData?._id
    const [username,setUsername] = useState(prevData.username);
    const [email,setEmail] = useState(prevData.email);
    const [admin,setAdmin] = useState(prevData.admin);
    const {user} = useContext(AuthContext)
    const [error,setError] = useState("")
    const {setLoading} = useContext(UtilContext)


    const updateUsersList = (updatedUser) => {
        setUsers(users => users.map(user => user._id === updatedUser._id ? updatedUser: user))
    }

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
            setLoading(true)
         const addedUser = await axios.put(
            `/api/users/${userId}`,
            { username, email, admin },
            config
          );
          updateUsersList(addedUser.data.data)
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
            <form onSubmit={submitHandler} className="form">
                <h1 className="form-title">Edit User</h1>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <input
                        type="text"
                        required
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
                        required
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
                <button type="submit" className="btn btn-primary">
                    save 
                </button>

            </form>
        </div>
    )
}

export default UserEditForm