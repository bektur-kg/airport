import {AppDispatch} from "../index"
import {commentSlice} from "../slices/commentSlice"
import axios from "../../axios"
import {IAirportComment, IServerResponse} from "../../models/models"
import {useAppSelector} from "../../hooks/redux";


export const fetchAirportComments = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {

      dispatch(commentSlice.actions.fetching())

      const response = await axios.get<IServerResponse<IAirportComment>>(`/airports/${id}/comments`)

      dispatch(commentSlice.actions.fetchingSuccess(response.data.results))

    }catch (e){

      dispatch(commentSlice.actions.fetchingError(e as Error))

    }
  }
}


export const handleCommentSubmit = (comment: string, id: string) => {
  return async (dispatch: AppDispatch) => {
    const access = localStorage.getItem('AIRPORT_ACCESS')

    try {

      const response = await axios.post(`airports/${id}/comments`, {comment}, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })

    }catch (e){

      dispatch(commentSlice.actions.fetchingError(e as Error))

    }
  }
}
