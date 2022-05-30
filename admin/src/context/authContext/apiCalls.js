import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "./AuthActions"

//Login
export const login = async (user, dispatch) => {
  dispatch(loginStart())
  try {
    const res = await axios.post("auth/login", user)
    res.data.inforUser.isAdmin && dispatch(loginSuccess(res.data.inforUser))
  } catch (err) {
    dispatch(loginFailure())
  }
}


