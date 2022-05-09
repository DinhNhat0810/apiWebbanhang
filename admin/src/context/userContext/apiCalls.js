import { 
  getUsersStart, 
  getUsersFailure, 
  getUsersSuccess, 
  deleteUserStart, 
  deleteUserFailure, 
  deleteUserSuccess, 
  createUserStart, 
  createUserFailure, 
  createUserSuccess,
  updateUserStart, 
  updateUserFailure, 
  updateUserSuccess,

} from "./UserActions"
import axios from 'axios'

//GET users
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
      const res = await axios.get("/users", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      console.log('Done')
      dispatch(getUsersSuccess(res.data))
    } catch (err) {
      dispatch(getUsersFailure())
    }
}

// //DELETE user
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart())
  try {
    await axios.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    console.log('Done')
    dispatch(deleteUserSuccess(id))
  } catch (err) {
    dispatch(deleteUserFailure())
  }
}

// //CREATE user
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart())
  try {
    const res = await axios.post("/auth/register", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    alert(`Thêm thành công tài khoản ${user.username}`)
    dispatch(createUserSuccess(res.data))
  } catch (err) {
    dispatch(createUserFailure());
  }
}

// //UPDATE user
export const updateUser = async (id, userUpdate, dispatch) => {
  dispatch(updateUserStart())
  try {
    const res = await axios.put("/users/" + id, userUpdate , {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    alert(`Cập nhật thành công`)
    dispatch(updateUserSuccess(res.data))
  } catch (err) {
    dispatch(updateUserFailure())
  }
}

