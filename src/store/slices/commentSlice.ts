import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IAirportComment} from "../../models/models"

interface ICommentSliceState {
  loading: boolean
  error: string
  data: IAirportComment[]
}

const initialState: ICommentSliceState = {
  loading: false,
  error: '',
  data: []
}

export const commentSlice = createSlice({
  name: 'airportComments',
  initialState,
  reducers: {
    fetching(state){

      state.loading = true

    },
    fetchingSuccess(state, action: PayloadAction<IAirportComment[]>){

      state.loading = false
      state.data = action.payload
      state.error = ''

    },
    fetchingError(state, action: PayloadAction<Error>){

      state.error = action.payload.message

    }
  },
})

export default commentSlice.reducer