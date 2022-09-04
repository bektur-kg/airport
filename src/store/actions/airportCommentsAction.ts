import {AppDispatch} from "../index"
import {commentSlice} from "../slices/commentSlice"
import {instance} from "../../axios"
import {IAirportComment, IServerResponse} from "../../models/models"
import {LocalStorageKey} from "../slices/authSlice"


export const fetchAirportComments = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {

      dispatch(commentSlice.actions.fetching())

      const response = await instance.get<IServerResponse<IAirportComment>>(`/airports/${id}/comments`)

      dispatch(commentSlice.actions.fetchingSuccess(response.data.results))

    } catch (e) {

      dispatch(commentSlice.actions.fetchingError(e as Error))

    }
  }
}

interface IResponseComment {
  airport: number
  comment: string
  created: string
  id: number
  user: number
}

export const handleCommentSubmit = (comment: string, id: string) => {
  return async (dispatch: AppDispatch) => {
    const access = localStorage.getItem('AIRPORT_ACCESS')

    try {

      await instance.post<IResponseComment>(`airports/${id}/comments`, {comment})


    } catch (e) {

      dispatch(commentSlice.actions.fetchingError(e as Error))

    }
  }
}
