import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../context/orderContext/OrderContext";
import { updateOrder } from "../../context/orderContext/apiCalls";
import ProductOrder from "../../pages/productOrder/ProductOrder";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./order.scss";

function changeDateFormat(date) {
  const newDate = new Date(date);
  const day = `0${newDate.getDate()}`.slice(-2);
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const year = newDate.getFullYear();
  const hours = `0${newDate.getHours()}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Order = () => {

  const cac = useContext(OrderContext)
  
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [orderUpdated, setOrderUpdated] = useState(null);
  const { dispatch } = useContext(OrderContext);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`/orders/find/${orderId}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setOrder(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getOrder();
  }, []);


  const handleChange = (e) => {
    const value = e.target.value;
    setOrderUpdated({ ...orderUpdated, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder(order._id, orderUpdated, dispatch);
  };



  return (
    <div className="order">
      <div className="titleContainer">
        <h1 className="title">Thông tin đơn hàng</h1>
      </div>

      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <p>Mã đơn hàng: {order?._id}</p>
                <p>
                  Thời gian đặt:{" "}
                  {order ? changeDateFormat(order.createdAt) : ""}
                </p>
              </div>
              <div className="userUpdateItem">
                <label>Tên người mua</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={handleChange}
                  defaultValue={order ? order.username : "..."}
                  name="username"
                />
              </div>

              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={handleChange}
                  defaultValue={order ? order.address : "..."}
                  name="address"
                />
              </div>

              <div className="userUpdateItem">
                <label>Trạng thái đơn hàng</label>
                <select
                  name="status"
                  onChange={handleChange}
                  defaultValue={order ? order.status : "..."}
                >
                  <option hidden defaultValue={order ? order.status : "..."}>
                    {order ? order.status : "..."}
                  </option>
                  <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Thất bại">Thất bại</option>
                </select>
              </div>
            </div>

            <div className="userUpdateRight">
              <h2>Sản phẩm đã đặt </h2>
              <TableContainer component={Paper} className="tableContainer">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Mã sản phẩm</TableCell>
                      <TableCell align="left">Tên sản phẩm</TableCell>
                      <TableCell align="center">Hình ảnh</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.products &&
                      order.products.map((item) => {
                        return (
                          <ProductOrder
                            key={item._id}
                            id={item._id}
                            quantity={item.quantity}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="totalPrice">
                <p>Phí giao hàng: 5 vnđ</p>
                Tổng giá tiền: {order ? order.amount : ""} vnđ
              </div>

              <button className="userUpdateButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
