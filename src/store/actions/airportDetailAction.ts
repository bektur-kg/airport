import {AppDispatch} from "../index"
import {instance} from "../../axios"
import {airportDetailSlice} from "../slices/airportDetail"
import {IDetailAirport} from "../../models/models"


export const fetchAirportDetail = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(airportDetailSlice.actions.fetching())

      const response = await instance.get<IDetailAirport>(`/airports/${id}`)

      dispatch(airportDetailSlice.actions.fetchSuccess(response.data))

    }catch (e) {
      dispatch(airportDetailSlice.actions.fetchError(e as Error))
    }
  }
}