import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {fetchAirportComments, handleCommentSubmit} from "../store/actions/airportCommentsAction"
import useInput from "../hooks/useInput"
import {useNavigate} from "react-router-dom"

const Comments = ({id}: {id: string}) => {
  const {loading, data, error} = useAppSelector(state => state.airportComments)
  const access = useAppSelector(state => state.auth.access)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const comment = useInput('')

  const createComment = async () => {
    await dispatch(handleCommentSubmit(comment.value, id))
    comment.setValue('')
    dispatch(fetchAirportComments(id))
  }

  useEffect(() => {
    dispatch(fetchAirportComments(id))
  }, [])

  return (
    <div className="container mx-auto max-w-[1200px] mt-8">

      <label className="flex items-center flex-col w-50 gap-2">
        <span className="text-sm font-semibold">Enter your Comment</span>
        <input
          type="text"
          className="border outline-0 rounded px-3 py-1"
          {...comment}
        />
        {
          access ? (
            <button
              className="border px-3 py-1 bg-blue-500 text-white rounded mt-2"
              onClick={createComment}
            >Submit</button>
          ) : (
            <button
              className="border px-3 py-1 bg-blue-500 text-white rounded mt-2"
              onClick={() => navigate('/auth')}
            >
              Authorize to Submit
            </button>
          )
        }
      </label>

      {
        loading ? (
          <span>Loading ...</span>
        ) : error ? (
          <span>{error}</span>
        ) : (
         <ul>
           {
             data.length !== 0 ? (
               data.map(message => <li key={message.id}>{message.comment}</li>)
             ) : (
               <span>no comments</span>
             )
           }
         </ul>
        )
      }
    </div>
  )
}

export default Comments
