import {AppDispatch} from "../index"
import {handbookSlice} from "../slices/handbookSlice"
import {instance} from "../../axios"
import {AirportCountry, AirportRegion, AirportType} from "../../models/models"


export const fetchHandbooks = () => {
  return async (dispatch: AppDispatch) => {
    try {

      dispatch(handbookSlice.actions.fetching())

      const response = await Promise.all([

        instance.get<AirportType[]>('handbooks/airport-types'),
        instance.get<AirportRegion[]>('handbooks/regions'),
        instance.get<AirportCountry[]>('handbooks/countries')

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