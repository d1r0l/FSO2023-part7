import { useState } from 'react'

export const useTextField = (name) => {
  const [ value, setValue ] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    onReset
  }
}
