import React, {ChangeEvent, useState} from 'react'

interface InputReturn {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const useInput = (initialState: string): InputReturn => {
  const [value, setValue] = useState(initialState)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange
  }
}

export default useInput
