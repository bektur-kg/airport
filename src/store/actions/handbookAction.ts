import {AppDispatch} from "../index"
import {handbookSlice} from "../slices/handbookSlice"
import axios from "../../axios"
import {AirportCountry, AirportRegion, AirportType} from "../../models/models"


export const fetchHandbooks = () => {
  return async (dispatch: AppDispatch) => {
    try {

      dispatch(handbookSlice.actions.fetching())

      const response = await Promise.all([

        axios.get<AirportType[]>('handbooks/airport-types'),
        axios.get<AirportRegion[]>('handbooks/regions'),
        axios.get<AirportCountry[]>('handbooks/countries')

      ])
      dispatch(handbookSlice.actions.fetchingSuccess({
        regions: response[1].data,
        countries: response[2].data,
        types: response[0].data
      }))

    } catch (e) {

    }
  }
}