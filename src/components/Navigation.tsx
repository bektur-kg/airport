import React from 'react'
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {authSlice} from "../store/slices/authSlice";

const Navigation = () => {
  const {username, isAuthorization} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    dispatch(authSlice.actions.logout())
  }

  return (
    <nav className="flex justify-between px-5 h-[50px] bg-amber-200 items-center shadow-xl">
      <Link className="font-semibold text-xl" to="/">Airport</Link>

      {
        !isAuthorization
          ? <Link to="/auth">login</Link>
          : <>
            <span className="font-bold text-lg text-sky-600">{username}</span>
            <a
              href="#"
              onClick={logoutHandler}
            >logout</a>
          </>
      }
    </nav>
  )
}

export default Navigation
