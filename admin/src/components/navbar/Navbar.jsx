import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'
import { useRef } from 'react'
import './navbar.scss' 

const Navbar = () => {
    const infoUser = JSON.parse(localStorage.getItem('user'))
    const optionsRef = useRef()

    const handleClick =  () => {
        
        optionsRef.current.classList.toggle('open')
    }

    const handleLogout = () => {
        
        localStorage.removeItem("user")
        window.location.href = "http://localhost:3000/login";
        
        
    }

    return (
        <div className="navbar">
            <div className="navbarWrapper">
                <div className="topLeft">
                    <span className="logo">Admin</span>
                </div>

                <div className="topRight">
                    <div className="navbarIconContainer">
                        <NotificationsNoneIcon/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="navbarIconContainer">
                        <LanguageIcon/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="navbarIconContainer">
                        <SettingsIcon/>
                    </div>

                    <div className="info">
                        <img src={infoUser ? infoUser.profilePicture : 
                            'https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-b0de2bad.jpg'} 
                            alt="" 
                            className="topAvatar" 
                            onClick={handleClick} 
                        />
                        <div className="options" ref={optionsRef}>
                            <p onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar

