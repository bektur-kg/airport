import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IDetailAirport} from "../../models/models"

interface IAirportDetailState {
  loading: boolean
  error: string

  data: IDetailAirport
}

const initialState: IAirportDetailState = {
  loading: false,
  error: '',

  data: {
    continent: '',
    coordinates: '',
    country: '',
    elevation_ft: '',
    gps_code: '',
    iata_code: '',
    ident: '',
    local_code: '',
    municipality: '',
    name: '',
    region: '',
    type: ''
  }
}

export const airportDetailSlice = createSlice({
  name: 'airportDetail',
  initialState,
  reducers: {
    fetching(state){
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<IDetailAirport>){
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>){
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default airportDetailSlice.reducer