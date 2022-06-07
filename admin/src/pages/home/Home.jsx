import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from "../../components/chart/Chart";
import "./home.scss";
import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );

  useEffect(() => {
    let isCancelled = false;
    const getUsers = async () => {
      try {
        const res = await axios.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err ){
        console.log(err)
      }
    };

    if (!isCancelled) {
      getUsers();
    }

    return () => {
      isCancelled = true;
    };
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo/>
      <Chart
        data={userStats}
        title="Thống kê người dùng"
        dataKey="Active User"
        grid
      />
      <div className="widgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
