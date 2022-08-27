import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AirportCountry, AirportRegion, AirportType} from "../../models/models"

interface IHandbookState {
  loading: boolean
  regions: AirportRegion[]
  countries: AirportCountry[]
  types: AirportType[]
}

interface IHandbooksPayload {
  regions: AirportRegion[]
  countries: AirportCountry[]
  types: AirportType[]
}


const initialState: IHandbookState = {
  loading: false,
  regions: [],
  countries: [],
  types: []
}


export const handbookSlice = createSlice({
  name: 'handbook',
  initialState,
  reducers: {
    fetching: (state) => {
      state.loading = true
    },
    fetchingSuccess: (state, action: PayloadAction<IHandbooksPayload>) => {
      state.loading = false
      state.regions = action.payload.regions
      state.types = action.payload.types
      state.countries = action.payload.countries
    }
  }
})

export default handbookSlice.reducer