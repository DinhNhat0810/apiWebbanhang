// import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
// import Chart from '../../components/chart/Chart'
import './home.scss'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'



const Home = () => {
    
    return (
        <div className="home">
            {/* <FeaturedInfo/> */}
            {/* <Chart data={userData} title="User Analytics" dataKey="Active User" grid/> */}
            <div className="widgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}   

export default Home