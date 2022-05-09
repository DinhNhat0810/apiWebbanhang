import LineStyleIcon from '@mui/icons-material/LineStyle'
import TimelineIcon from '@mui/icons-material/Timeline'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom'



import './sidebar.scss' 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyleIcon className="sidebarIcon"/>
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PersonOutlineIcon className="sidebarIcon"/>
                                Người dùng
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                                <StorefrontIcon className="sidebarIcon"/>
                                Sản phẩm
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <AttachMoneyIcon className="sidebarIcon"/>
                            Đơn hàng
                        </li>
                        <li className="sidebarListItem">
                            <NotificationsIcon className="sidebarIcon"/>
                            Thông báo
                        </li>
                        <Link to="/newProduct" className="link">
                            <li className="sidebarListItem">
                                <StorefrontIcon className="sidebarIcon"/>
                                Thêm sản phẩm
                            </li>
                        </Link>
                        <Link to="/newUser" className="link">
                            <li className="sidebarListItem">
                                <PersonOutlineIcon className="sidebarIcon"/>
                                Thêm người dùng
                            </li>
                        </Link>
                    </ul>
                </div>




            </div>
        </div>
    )
}

export default Sidebar

