import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../axios";
import {IDetailAirport} from "../models/models";

const AirportDetailPage = () => {
  const {id} = useParams<'id'>()
  const [detailData, setDetailData] = useState<IDetailAirport | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchDetailData = async () => {
    setLoading(true)

    const response = await axios.get<IDetailAirport>(`airports/${id}`)
    setDetailData(response.data)

    setLoading(false)
  }

  useEffect(() => {
    fetchDetailData()
  }, [])

  return (
    <div className="container mx-auto max-w-[1200px] mt-4">
      <h1 className="text-center font-semibold">{detailData?.name}</h1>
      <div className="flex flex-col">
        <span>{detailData?.country}</span>
        <span>{detailData?.continent}</span>
        <span>{detailData?.coordinates}</span>
        <span>{detailData?.elevation_ft}</span>
        <span>{detailData?.gps_code}</span>
        <span>{detailData?.type}</span>
      </div>
    </div>
  );
};

export default AirportDetailPage;




