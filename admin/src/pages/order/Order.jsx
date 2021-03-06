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
        <h1 className="title">Th??ng tin ????n h??ng</h1>
      </div>

      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Ch???nh s???a</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <p>M?? ????n h??ng: {order?._id}</p>
                <p>
                  Th???i gian ?????t:{" "}
                  {order ? changeDateFormat(order.createdAt) : ""}
                </p>
              </div>
              <div className="userUpdateItem">
                <label>T??n ng?????i mua</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={handleChange}
                  defaultValue={order ? order.username : "..."}
                  name="username"
                />
              </div>

              <div className="userUpdateItem">
                <label>?????a ch???</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  onChange={handleChange}
                  defaultValue={order ? order.address : "..."}
                  name="address"
                />
              </div>

              <div className="userUpdateItem">
                <label>Tr???ng th??i ????n h??ng</label>
                <select
                  name="status"
                  onChange={handleChange}
                  defaultValue={order ? order.status : "..."}
                >
                  <option hidden defaultValue={order ? order.status : "..."}>
                    {order ? order.status : "..."}
                  </option>
                  <option value="Ch??a ho??n th??nh">Ch??a ho??n th??nh</option>
                  <option value="???? ho??n th??nh">???? ho??n th??nh</option>
                  <option value="Th???t b???i">Th???t b???i</option>
                </select>
              </div>
            </div>

            <div className="userUpdateRight">
              <h2>S???n ph???m ???? ?????t </h2>
              <TableContainer component={Paper} className="tableContainer">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">M?? s???n ph???m</TableCell>
                      <TableCell align="left">T??n s???n ph???m</TableCell>
                      <TableCell align="center">H??nh ???nh</TableCell>
                      <TableCell align="center">S??? l?????ng</TableCell>
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
                <p>Ph?? giao h??ng: 5 vn??</p>
                T???ng gi?? ti???n: {order ? order.amount : ""} vn??
              </div>

              <button className="userUpdateButton" onClick={handleSubmit}>
                C???p nh???t
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
