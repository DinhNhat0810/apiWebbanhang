import VisibilityIcon from '@mui/icons-material/Visibility'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './widgetSm.scss'


const WidgetSm = () => {

    const [ newUsers, setNewUsers ]  = useState([])

    useEffect(() => {
        let isCancelled = false

        const getUsers = async () => {
            try {
                const res = await axios.get('/users?new=true', {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                })
                setNewUsers(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        if (!isCancelled) {
            getUsers()

        }

        return () => {
            isCancelled = true
        }
    }, [])

    return (
        <div className="widgetSm">
            <div className="widgetSmTitle">Thành viên mới</div>
            <ul className="widgetSmList">
                {newUsers.map(newUser => (
                    <li className="widgetSmListItem" key={newUser.username}>
                        <img
                            src={newUser.profilePicture ? newUser.profilePicture : "https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{newUser.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <VisibilityIcon className="widgetSmIcon"/>
                            Hiển thị
                        </button>
                    </li>
                ))}
                
                
            </ul>
        </div>
    )
}   

export default WidgetSm