import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featuredInfo.scss";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [perc, setPerc] = useState(0);

  const getIncome = async () => {
    try {
      const res = await axios.get("orders/income", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setIncome(res.data);
      const arrLength = res.data.length;
      setPerc(
        (res.data[arrLength - 1].total * 100) / res.data[arrLength - 2].total -
          100
      );
    } catch {}
  };

  const getOrders = async () => {
    try {
      const res = await axios.get("orders/done", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setOrders(res.data);
    } catch {}
  };

  const getRevenue = async () => {
    try {
      const res = await axios.get("orders/total", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setRevenue(res.data);
    } catch {}
  };

  useEffect(() => {
    let cancelled = true;

    if (cancelled) {
      getIncome();
      getOrders();
      getRevenue();
    }

    return () => {
      cancelled = false;
    };
  }, []);

  console.log(orders)

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Doanh thu tháng này</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {income[income.length - 1]?.total} vnđ
          </span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="sub">So với tháng trước</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Tổng danh thu</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{revenue[0]?.total} vnđ</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Tổng số đơn hàng đã bán</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orders && orders}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfo;
