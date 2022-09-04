import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface IAuthState {
  username: string
  access: string
  isAuthorization: boolean
}

interface IAuthPayload {
  username: string
  access: string
  refresh: string
}

export enum LocalStorageKey {
  ACCESS = 'AIRPORT_ACCESS',
  REFRESH = 'AIRPORT_REFRESH',
  USERNAME = 'AIRPORT_USERNAME'
}

const initialState: IAuthState = {
  username: localStorage.getItem(LocalStorageKey.USERNAME) ?? '',
  access: localStorage.getItem(LocalStorageKey.ACCESS) ?? '',
  isAuthorization: !!localStorage.getItem(LocalStorageKey.ACCESS)
}

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAuthPayload>){
      state.access = action.payload.access
      state.username = action.payload.username
      state.isAuthorization = !!action.payload.access

      localStorage.setItem(LocalStorageKey.ACCESS, action.payload.access)
      localStorage.setItem(LocalStorageKey.USERNAME, action.payload.username)
      localStorage.setItem(LocalStorageKey.REFRESH, action.payload.refresh)
    },
    logout(state){
      state.access = ''
      state.username = ''
      state.isAuthorization = false

      localStorage.removeItem(LocalStorageKey.USERNAME)
      localStorage.removeItem(LocalStorageKey.ACCESS)
      localStorage.removeItem(LocalStorageKey.REFRESH)
    }
  },
})

export default authSlice.reducer