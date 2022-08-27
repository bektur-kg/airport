import React, {useEffect, useState} from 'react';
import AirportSearch from "../components/AirportSearch";
import AirportFilter from "../components/AirtportFilter";
import AirportCard from "../components/AirportCard";
import {fetchAirports} from "../store/actions/airportAction";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import ReactPaginate from 'react-paginate';
import {fetchHandbooks} from "../store/actions/handbookAction";

const PAGE_COUNT_PER_PAGE = 20

const MainPage = () => {
  const dispatch = useAppDispatch()
  const {error, airports, loading, count} = useAppSelector(state => state.airport)
  const [currentPage, setCurrentPage] = useState(1)

  const pageCount = Math.ceil(count / PAGE_COUNT_PER_PAGE)

  useEffect(() => {
    dispatch(fetchAirports(currentPage, PAGE_COUNT_PER_PAGE))
  }, [currentPage, dispatch])

  useEffect(() => {
    dispatch(fetchHandbooks())
  }, [])


  const changePageHandler = ({selected}: {selected: number}) => {
    setCurrentPage(selected + 1)
  }

  return (
    <div className="container mx-auto max-w-[768px] py-5 ">

      <AirportSearch/>

      <AirportFilter/>

      {
        loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-xl font-semibold">{error}</p>
        ) : (
          airports.map(airport => (
            <AirportCard
              key={airport.id}
              airport={airport}
            />
          ))
        )
      }

      <div className="flex justify-center">
        {
          pageCount && <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={changePageHandler}
            forcePage={currentPage - 1}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="flex"
            pageClassName="py-1 px-3 border mx-1 rounded bg-cyan-300"
            activeClassName="bg-orange-100"
            previousClassName="py-1 px-3 border bg-zinc-600 text-white text-bold text-xl rounded"
            nextClassName="py-1 px-3 border bg-zinc-600 text-white text-bold text-xl rounded"
          />
        }
      </div>
      </div>
    );
};

export default MainPage

