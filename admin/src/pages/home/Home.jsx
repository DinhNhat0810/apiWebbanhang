// import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from '../../components/chart/Chart'
import './home.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'



const Home = () => {

    const [userStats, setUsersStats] = useState([])

    useEffect(() => {
        let isCancelled = false

        const getUsers = async () => {
            try {
                const res = await axios.get('/users/stats', {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                })
                setUsersStats(res.data)
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
        <div className="home">
            {/* <FeaturedInfo/> */}
            <Chart data={userStats} title="User Analytics" dataKey="Active User" grid/>
            <div className="widgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}   

export default Home