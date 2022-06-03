import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "./AuthActions"

//Login
export const login = async (user, dispatch) => {
  dispatch(loginStart())
  try {
    const res = await axios.post("auth/login", user)
    // console.log(res.data.payload)
    res.data.payload.isAdmin && dispatch(loginSuccess(res.data.payload))
  } catch (err) {
    dispatch(loginFailure())
  }
}


