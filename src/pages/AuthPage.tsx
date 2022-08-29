import React, {FormEvent} from 'react'
import useInput from "../hooks/useInput"
import {useAppDispatch} from "../hooks/redux"
import {login, register} from "../store/actions/authAction"
import {useNavigate} from "react-router-dom"

const AuthPage = () => {
  const username = useInput('')
  const password = useInput('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isFormValid = () => username.value && password.value

  const loginHandler = () => {

    if (isFormValid()) {
      dispatch(login({
        username: username.value,
        password: password.value
      }))

      navigate('/')
    } else {
      alert('enter valid data or fil all inputs')
    }
  }

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()

    try {

      if (isFormValid()) {
        await dispatch(register({
          username: username.value,
          password: password.value
        }))

        navigate('/')
      } else {
        alert('enter valid data or fil all inputs')
      }

    }catch (e) {

    }
  }

  return (
    <form
      className="container mx-auto mt-10 h-full text-center"
      onSubmit={submitHandler}
    >
      <span className="text-xl font-bold text-center">Auth Form</span>
      <div className="w-full mt-5 flex flex-col gap-5">
        <label htmlFor="username">
          <span className="pr-4">Username</span>
          <input
            type="text"
            className="border outline-0 w-1/2 rounded px-3 py-1"
            {...username}
          />
        </label>
        <label htmlFor="password">
          <span className="pr-4">Password</span>
          <input
            type="password"
            className="border outline-0 w-1/2 rounded px-3 py-1"
            {...password}
          />
        </label>
      </div>
      <div className="mt-5 flex justify-between w-1/5 mx-auto">
        <button
          className="bg-green-400 px-3 py-1 rounded text-white hover:shadow-xl hover:transition-all"
          type="button"
          onClick={loginHandler}
        >Login
        </button>
        <button
          className="bg-blue-400 px-3 py-1 rounded text-white hover:shadow-xl hover:transition-all"
          type="submit"
        >Register
        </button>
      </div>
    </form>
  )
}

export default AuthPage
