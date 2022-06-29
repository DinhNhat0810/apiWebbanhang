import { 
  getOrdersStart, 
  getOrdersSuccess, 
  getOrdersFailure, 
  deleteOrderStart, 
  deleteOrderFailure, 
  deleteOrderSuccess, 
  updateOrderStart, 
  updateOrderFailure, 
  updateOrderSuccess,
} from "./OrderActions"
import axios from 'axios'

//GET orders
export const getOrders = async (dispatch) => {
    dispatch(getOrdersStart())
    try {
      const res = await axios.get("/orders", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      console.log('Done')
      dispatch(getOrdersSuccess(res.data))
    } catch (err) {
      dispatch(getOrdersFailure())
    }
}


//DELETE order
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart())
  try {
    await axios.delete("/orders/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    console.log('Done')
    dispatch(deleteOrderSuccess(id))
  } catch (err) {
    dispatch(deleteOrderFailure())
  }
}

//UPDATE product
export const updateOrder = async (id, orderUpdate, dispatch) => {
  dispatch(updateOrderStart())
  try {
    const res = await axios.put("/orders/" + id, orderUpdate , {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    alert('Đã cập nhật thành công!')
    dispatch(updateOrderSuccess(res.data.payload))

  } catch (err) {
    dispatch(updateOrderFailure())
  }
}

