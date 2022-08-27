import {AppDispatch} from "../index"
import axios from "../../axios"
import {authSlice} from "../slices/authSlice"

interface IResponseAuth {
  access: string
  refresh: string
}

interface IAuthUserData {
  username: string
  password: string
}

export const register = (data: IAuthUserData) => {

  return async (dispatch: AppDispatch) => {

    try {

      const response = await axios.post<IResponseAuth>('/auth/register', data )

      dispatch(authSlice.actions.login({
        username: data.username,
        access: response.data.access
      }))

    }catch (e) {
      throw e as Error
    }
  }
}

export const login = (data: IAuthUserData) => {

  return async (dispatch: AppDispatch) => {

    try {

      const response = await axios.post<IResponseAuth>('/auth/login', data )

      dispatch(authSlice.actions.login({
        username: data.username,
        access: response.data.access
      }))

    }catch (e) {
      throw e as Error
    }
  }
}