import { 
  getBlogsStart, 
  getBlogsSuccess, 
  getBlogsFailure, 
  deleteBlogStart, 
  deleteBlogFailure, 
  deleteBlogSuccess, 
  createBlogStart, 
  createBlogFailure, 
  createBlogSuccess,
  updateBlogStart, 
  updateBlogFailure, 
  updateBlogSuccess

} from "./BlogActions"
import axios from 'axios'

//GET products
export const getBlogs = async (dispatch) => {
    dispatch(getBlogsStart())
    try {
      const res = await axios.get("/blogs/", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      dispatch(getBlogsSuccess(res.data.payload))
      console.log('Done')
    } catch (err) {
      dispatch(getBlogsFailure())
    }
}

//DELETE blog
export const deleteBlog = async (id, dispatch) => {
  dispatch(deleteBlogStart())
  try {
    await axios.delete("/blogs/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    dispatch(deleteBlogSuccess(id))
    console.log('Done')
  } catch (err) {
    dispatch(deleteBlogFailure())
  }
}

//CREATE product
export const createBlog = async (product, dispatch) => {
  dispatch(createBlogStart())
  try {
    const res = await axios.post("/blogs", product, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    dispatch(createBlogSuccess(res.payload.data))
    alert(res.data.message)
  } catch (err) {
    dispatch(createBlogFailure())
  }
}

//UPDATE product
export const updateBlog = async (id, productUpdate, dispatch) => {
  dispatch(updateBlogStart())
  try {
    const res = await axios.put("/blogs/" + id, productUpdate , {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    dispatch(updateBlogSuccess(res.data.payload))
    alert('Đã cập nhật thành công!')
  } catch (err) {
    dispatch(updateBlogFailure())
  }
}

