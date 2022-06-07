import "./widgetLg.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function changeDateFormat(date) {
  const newDate = new Date(date);
  const day = `0${newDate.getDate()}`.slice(-2);
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const year = newDate.getFullYear();
  const hours = `0${newDate.getHours()}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get("/orders", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      getOrders();
    }

    
    return () => {
      isCancelled = true;
    };
  }, []);

 


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Giao dich gần nhất</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Khách hàng</th>
            <th className="widgetLgTh">Ngày giao dịch</th>
            <th className="widgetLgTh">Số lượng</th>
            <th className="widgetLgTh">Trạng thái</th>
          </tr>

          {orders &&
            orders.map((item) => {
              return (
                <tr key={item._id} className="widgetLgTr">
                  <td className="widgetLgUser">
                    <img
                      src={item.profilePicture ? item.profilePicture : 'https://static2.yan.vn/YanNews/2167221/202003/dan-mang-du-trend-thiet-ke-avatar-du-kieu-day-mau-sac-tu-anh-mac-dinh-b0de2bad.jpg'}
                      alt=""
                      className="widgetLgImg"
                    />
                    <span className="widgetLgName">{item.username}</span>
                  </td>
                  <td className="widgetLgDate">{changeDateFormat(item.createdAt)}</td>
                  <td className="widgetLgAmount">${item.amount}</td>
                  <td className="widgetLgStatus">
                    <Button type={item.status} />
                  </td>
                </tr>
              );
            })}

  
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
