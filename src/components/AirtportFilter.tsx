import React, {ChangeEvent, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {IFilter} from "../models/models"
import {airportSlice} from '../store/slices/airportSlice'

const AirportFilter = () => {
  const {countries, loading, regions, types} = useAppSelector(state => state.handbook)
  const dispatch = useAppDispatch()

  const [filter, setFilter] = useState<IFilter>({
    country: '',
    region: '',
    type: ''
  })

  const isFilterEnabled = () => {
    return filter.country || filter.region || filter.type
  }

  useEffect(() => {
    dispatch(airportSlice.actions.filterAirports(filter))
  }, [filter])

  const changeFilterHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const defaultFilterHandler = () => {
    setFilter({
      country: '',
      region: '',
      type: ''
    })
  }


  if (loading) return <span className="flex justify-center text-lg">Loading...</span>

  return (
    <div className="flex items-center">
      <h4 className="font-semibold text-xl">Filter</h4>

      <div className="flex ml-4">

        <select
          name="country"
          className="mr-3 py-1 px-2 border-zinc-400 border outline-0 rounded bg-zinc-200"
          onChange={changeFilterHandler}
          value={filter.country}
        >
          <option value="" disabled>Country</option>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>

        <select
          name="region"
          className="mr-3 py-1 px-2 border-zinc-400 border outline-0 rounded bg-zinc-200"
          onChange={changeFilterHandler}
          value={filter.region}
        >
          <option value="" disabled>Region</option>
          {regions.map(r => <option key={r}>{r}</option>)}
        </select>

        <select
          name="type"
          className="mr-3 py-1 px-2 border-zinc-400 border outline-0 rounded bg-zinc-200"
          onChange={changeFilterHandler}
          value={filter.type}
        >
          <option value="" disabled>Type</option>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>

        {
          isFilterEnabled() && (
            <button
              title="Set Default Filter"
              className="px-3 py-1 bg-red-700 rounded text-white"
              onClick={defaultFilterHandler}
            >&times;</button>
          )
        }
      </div>
    </div>
  );
};

export default AirportFilter;
