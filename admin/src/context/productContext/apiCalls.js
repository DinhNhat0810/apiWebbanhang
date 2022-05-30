import { 
  getProductsStart, 
  getProductsSuccess, 
  getProductsFailure, 
  deleteProductStart, 
  deleteProductFailure, 
  deleteProductSuccess, 
  createProductStart, 
  createProductFailure, 
  createProductSuccess,
  updateProductStart, 
  updateProductFailure, 
  updateProductSuccess,
  searchProductStart, 
  searchProductFailure, 
  searchProductSuccess,

} from "./ProductActions"
import axios from 'axios'

//GET products
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart())
    try {
      const res = await axios.get("/products/", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      console.log('Done')
      dispatch(getProductsSuccess(res.data.payload))
    } catch (err) {
      dispatch(getProductsFailure())
    }
}

//Search products
export const searchProducts = async (value, dispatch) => {
  dispatch(searchProductStart())
  try {
    const res = await axios.get("/products?category=" + value, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    dispatch(searchProductSuccess(res.data.payload))
    if (res.data.payload.length > 0) {
      console.log(res.data.payload)
    }
  } catch (err) {
    dispatch(searchProductFailure())
  }
}

//DELETE product
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart())
  try {
    await axios.delete("/products/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    console.log('Done')
    dispatch(deleteProductSuccess(id))
  } catch (err) {
    dispatch(deleteProductFailure())
  }
}

//CREATE product
export const createProduct = async (product, dispatch) => {
  dispatch(createProductStart())
  try {
    const res = await axios.post("/products", product, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    alert(res.data.message)
    dispatch(createProductSuccess(res.payload.data))
  } catch (err) {
    dispatch(createProductFailure())
  }
}

//UPDATE product
export const updateProduct = async (id, productUpdate, dispatch) => {
  dispatch(updateProductStart())
  try {
    const res = await axios.put("/products/" + id, productUpdate , {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    alert('Đã cập nhật thành công!')
    dispatch(updateProductSuccess(res.data))
  } catch (err) {
    dispatch(updateProductFailure())
  }
}

