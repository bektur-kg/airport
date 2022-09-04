import React, {ChangeEvent, useState} from 'react'

interface InputReturn {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  setValue: (value: string) => void
}

const useInput = (initialState: string): InputReturn => {
  const [value, setValue] = useState(initialState)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    setValue,
    onChange
  }
}

export default useInput
