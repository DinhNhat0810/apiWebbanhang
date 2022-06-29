import axios from "axios";
import { useState, useEffect } from "react";
import "./productOrder.scss";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const ProductOrder = ({ id, quantity }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`/products/find/${id}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setProduct(res.data.payload);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, []);

  return (
    <TableRow
      className="productOrder"
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {product?._id}
      </TableCell>
      <TableCell component="th" scope="row">
        {product?.title}
      </TableCell>
      <TableCell align="center">
        <img src={product?.img} />
      </TableCell>
      <TableCell align="center">
        <div className="productOrder-quantity">{quantity} * {product?.price - ((product?.price * product?.discount) / 100)} vnđ (-{product?.discount}%)</div>
      </TableCell>
    </TableRow>
  );
};

export default ProductOrder;
