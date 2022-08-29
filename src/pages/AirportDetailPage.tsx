import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {fetchAirportDetail} from "../store/actions/airportDetailAction"
import Comments from "../components/Comments"

const AirportDetailPage = () => {
  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const {loading, error, data} = useAppSelector(state => state.airportDetail)

  useEffect(() => {
    dispatch(fetchAirportDetail(id!))
  }, [])


  return (
    loading ? (
      <span>Loading ...</span>
    ) : error ? (
      <span>{error}</span>
    ) : (
      <>
        <div className="container mx-auto max-w-[1200px] mt-4">
          <h1 className="text-center font-semibold">{data?.name}</h1>
          <div className="flex flex-col">
            <span>{data?.country}</span>
            <span>{data?.continent}</span>
            <span>{data?.coordinates}</span>
            <span>{data?.elevation_ft}</span>
            <span>{data?.gps_code}</span>
            <span>{data?.type}</span>
          </div>
        </div>

        <div>
          <Comments id={id!}/>
        </div>
      </>
    )
  )

}

export default AirportDetailPage




