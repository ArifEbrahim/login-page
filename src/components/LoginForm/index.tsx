import Heading from '../Heading'
import Button from '../Button'
import { PiSignInBold } from 'react-icons/pi'
import styles from './LoginForm.module.css'
import { LoginFormProps } from '../../types/Login'
import { useInput } from '../../hooks/useInput'

function LoginForm({ callAPI }: LoginFormProps) {
  const validate = (value: string) => value.trim() !== ''

  const {
    value: email,
    hasError: emailHasError,
    isValid: isEmailValid,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    setIsTouched: emailTouched
  } = useInput(validate)

  const {
    value: password,
    hasError: passwordHasError,
    isValid: isPasswordValid,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    setIsTouched: passwordTouched
  } = useInput(validate)

  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    emailTouched(true)
    passwordTouched(true)

    if (isFormValid) callAPI({ email, password })
  }

  return (
    <div className={styles['form-content']} data-testid="form-content">
      <form onSubmit={handleSubmit}>
        <Heading text="Log in." />
        <div className={styles['input-container']}>
          <input
            placeholder="Your Email Address"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className={emailHasError ? styles['invalid'] : ''}
          />
        </div>
        <div className={styles['error-text']}>
          {emailHasError && 'Email must not be blank'}
        </div>
        <div className={styles['input-container']}>
          <input
            placeholder="Your Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            className={passwordHasError ? styles['invalid'] : ''}
            type="password"
          />
        </div>
        <div className={styles['error-text']}>
          {passwordHasError && 'Password must not be blank'}
        </div>
        <Button type="submit" disabled={!isFormValid}>
          <span>log in</span>
          <PiSignInBold size={'1.4em'} />
        </Button>
      </form>
    </div>
  )
}
export default LoginForm
