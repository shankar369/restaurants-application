import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/authContext'
import { getUsers } from "../apis/restaurantData";
import LightBox from '../components/LightBox';
import UserEditForm from '../components/UserEditForm';
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import UserDeleteForm from '../components/UserDeleteForm';
import { UtilContext } from '../contexts/utilContext';




const Users = () => {
    const [users, setUsers] = useState([])
    const {user} = useContext(AuthContext)
    const {loading,setLoading} = useContext(UtilContext)
    const [showForm, setShowForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [prevData,setPrevData] = useState({})

    // const handleModalClick = (e) => {
    //     if(e.target.className === "light-box")
    //     setShowForm(false)
    // }
    const handleModalClick = (e) => {
        if(e.target.className === "light-box"){
            setShowForm(false)
            setShowDeleteForm(false)
        }
    }

    useEffect(() => {
        getUsers(setUsers, user.token,setLoading);
    }, [])


    return (
        <div className="screen">
            <div className="flex-class">
                <div className="shadow">
                        {!loading && (
                            <table>
                            <tbody>
                                <tr className="table-header">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {users.map(user => (
                                    <tr key={user._id}>
                                    <td data-th="Name">
                                        {user.username}
                                    </td>
                                    <td data-th="Email">
                                        {user.email}
                                    </td>
                                    <td data-th="Admin">
                                        {user.admin}
                                    </td>
                                    <td
                                        data-th="Edit" 
                                        onClick = {() => {
                                            setPrevData(user)
                                            setShowForm(true)
                                        }
                                    }

                                    >
                                        <span className="icon">
                                            <MdEditNote color="black" size="30px" />
                                        </span>
                                    </td>
                                    <td
                                        data-th="Edit" 
                                        onClick = {() => {
                                            setPrevData(user)
                                            setShowDeleteForm(true)
                                        }
                                    }
                                    >
                                        <span className="icon">
                                            <MdDeleteForever color="rgba(241, 50, 50, 0.938)" size="30px" />
                                        </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        )}
                
                </div>
            </div>
            <div onClick={e => handleModalClick(e)}>
                {showForm &&<LightBox> <UserEditForm setUsers={setUsers} setShowForm={setShowForm} prevData={prevData} /> </LightBox>}
            </div>
            <div onClick={e => handleModalClick(e)}>
                {showDeleteForm &&<LightBox> <UserDeleteForm setUsers={setUsers} setShowForm={setShowDeleteForm} prevData={prevData} /> </LightBox>}
            </div>
        </div>
    )
}

export default Users