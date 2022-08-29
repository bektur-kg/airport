import {combineReducers, configureStore} from "@reduxjs/toolkit"
import airportReducer from './slices/airportSlice'
import handbookReducer from './slices/handbookSlice'
import authReducer from './slices/authSlice'
import airportDetailReducer from './slices/airportDetail'
import airportCommentsReducer from './slices/commentSlice'

const rootReducer = combineReducers({
  airport: airportReducer,
  handbook: handbookReducer,
  auth: authReducer,
  airportDetail: airportDetailReducer,
  airportComments: airportCommentsReducer
})

export const store = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof store>

export type AppDispatch = AppStore['dispatch']