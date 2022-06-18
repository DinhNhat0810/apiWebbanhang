import { 
  getOrdersStart, 
  getOrdersSuccess, 
  getOrdersFailure, 
  deleteOrderStart, 
  deleteOrderFailure, 
  deleteOrderSuccess, 
  
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

