import { useState } from 'react'
import Heading from '../Heading'
import Button from '../Button'
import { PiSignInBold } from 'react-icons/pi'
import styles from './LoginForm.module.css'
import { LoginFormProps } from '../../types/Login'

function LoginForm({ callAPI }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [password, setPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() === '' && password.trim() === '') {
      setIsEmailValid(false)
      setIsPasswordValid(false)
    } else if (password.trim() === '') {
      setIsPasswordValid(false)
    } else if (email.trim() === '') {
      setIsEmailValid(false)
    } else {
      callAPI({ email, password })
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-content']}>
        <form onSubmit={handleSubmit}>
          <Heading text="Log in." />
          <div className={styles['input-wrapper']}>
            <div className={styles['input-container']}>
              <input
                placeholder="Your Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              {!isEmailValid && <p>Email must not be blank</p>}
            </div>
          </div>
          <div className={styles['input-wrapper']}>
            <div className={styles['input-container']}>
              <input
                placeholder="Your Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {!isPasswordValid && <p>Password must not be blank</p>}
            </div>
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
