import { useState } from 'react'
import Heading from '../Heading'
import Button from '../Button'
import { PiSignInBold } from 'react-icons/pi'
import styles from './LoginForm.module.css'
import { LoginFormProps } from '../../types/Login'

function LoginForm({ callAPI }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const isEmailValid = email.trim() !== ''
  const isEmailInputInvalid = !isEmailValid && isEmailTouched

  const [password, setPassword] = useState('')
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)
  const isPasswordValid = password.trim() !== ''
  const isPasswordInputInvalid = !isPasswordValid && isPasswordTouched

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEmailTouched(true)
    setIsPasswordTouched(true)

    if (isEmailValid && isPasswordValid) callAPI({ email, password })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleEmailBlur = () => {
    setIsEmailTouched(true)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true)
  }

  return (
    <div className={styles['form-container']} data-testid="form-container">
      <div className={styles['form-content']}>
        <form onSubmit={handleSubmit}>
          <Heading text="Log in." />
          <div className={styles['input-container']}>
            <input
              placeholder="Your Email Address"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={isEmailInputInvalid ? styles['invalid'] : ''}
            />
          </div>
          <div className={styles['error-text']}>
            {isEmailInputInvalid && 'Email must not be blank'}
          </div>
          <div className={styles['input-container']}>
            <input
              placeholder="Your Password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={isPasswordInputInvalid ? styles['invalid'] : ''}
            />
          </div>
          <div className={styles['error-text']}>
            {isPasswordInputInvalid && 'Password must not be blank'}
          </div>
          <Button type="submit">
            <span>log in</span>
            <PiSignInBold size={'1.4em'} />
          </Button>
        </form>
      </div>
    </div>
  )
}
export default LoginForm
