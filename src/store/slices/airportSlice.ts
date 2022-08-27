import {IAirport, IFilter} from "../../models/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface IAirportSlice {
  loading: boolean;
  error: string;
  airports: IAirport[]
  airportsContainer: IAirport[]
  count: number
}

interface IAirportPayload {
  airports: IAirport[]
  count: number
}


const initialState: IAirportSlice = {
  loading: false,
  error: '',
  airports: [],
  airportsContainer: [],
  count: 0
}

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<IAirportPayload>) {
      state.loading = false
      state.airports = action.payload.airports
      state.airportsContainer = action.payload.airports
      state.count = action.payload.count
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>){
      state.loading = false
      state.error = action.payload.message
    },
    filterAirports(state, action: PayloadAction<IFilter>){
      state.airports = state.airportsContainer
        .filter(a => a.type.includes(action.payload.type))
        .filter(a => a.region.includes(action.payload.region))
        .filter(a => a.country.includes(action.payload.country))
    }
  }
})

export default airportSlice.reducer

