import React, {useEffect, useState} from 'react';
import useInput from "../hooks/useInput";
import {useDebounce} from "../hooks/useDebounce";
import axios from "../axios";
import {IAirport} from "../models/models";
import {useNavigate} from "react-router-dom";

const AirportSearch = () => {
  const input = useInput('')
  const navigate = useNavigate()
  const [searchedData, setSearchedData] = useState<IAirport[]>([])
  const debouncedValue = useDebounce<string>(input.value)

  const fetchAirports = async () => {
    const response = await axios.get(
      'airports',
      {
        params: {name: debouncedValue, count: 7}
      }
    )
    setSearchedData(response.data.results)
  }

  useEffect(() => {
    debouncedValue.length > 3 && fetchAirports()
    debouncedValue.length === 0 && setSearchedData([])
  }, [debouncedValue])

  const onClickSearchedAirport = (id: number) => navigate(`/airport/${id}`)


  return (
    <div className="relative">
      <input
        type="text"
        className="w-full outline-0 py-2 text-base border px-4 py-3 mb-4 rounded"
        placeholder="Type something..."
        {...input}
      />

      {
        searchedData.length !== 0 && (
          <ul className="list-none absolute w-full h-[250px] bg-zinc-100 top-12 rounded overflow-y-auto">
            {
              searchedData.map(airport => (
                <li
                  key={airport.id}
                  className="p-2 m-2 hover:cursor-pointer hover:bg-zinc-300 hover:transition-all"
                  onClick={() => onClickSearchedAirport(airport.id)}
                >
                  {airport.name}
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default AirportSearch
