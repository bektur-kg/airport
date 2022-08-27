import React from 'react';
import {IAirport} from "../models/models";
import {useNavigate} from "react-router-dom";

interface IAirportCardProps {
  airport: IAirport
}

const AirportCard = ({ airport }: IAirportCardProps) => {
  const navigate = useNavigate()

  const redirectHandler = () => navigate(`/airport/${airport.id}`)

  return (
    <div
      className="border p-4 m-5 hover:shadow-lg ease-in-out cursor-pointer hover:transition-all rounded"
      onClick={redirectHandler}
    >
      <p className="text-lg font-bold text-zinc-800">{airport.name}</p>
      <p>{airport?.region}</p>
      <p>{airport?.country}</p>
      <p>{airport?.type}</p>
      <p>{airport?.ident}</p>
      <p>{airport?.local_code}</p>
    </div>
  );
};

export default AirportCard;
