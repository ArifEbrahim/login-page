import { useState } from 'react'

export function useInput(validate: (value: string) => boolean) {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isValid = validate(value)
  const hasError = !isValid && isTouched

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const handleInputBlur = () => setIsTouched(true)

  return {
    value,
    hasError,
    isValid,
    handleInputChange,
    handleInputBlur,
    setIsTouched
  }
}
