import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import roadImage from '../../assets/road.png'
import LoginForm from '../../components/LoginForm'
import { CallAPIProps } from '../../types/Login'
import Loader from '../../components/Loader'
import { useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const URL = 'https://api.bybits.co.uk/auth/token'
  const CONFIG = {
    headers: {
      environment: 'mock'
    }
  }

  const callAPIAndSaveToken = async ({ email, password }: CallAPIProps) => {
    setIsLoading(true)
    const data = {
      username: email,
      password,
      type: 'USER_PASSWORD_AUTH'
    }
    try {
      const response = await axios.post(URL, data, CONFIG)
      if (response) {
        localStorage.setItem('token', response.data.access_token)
        navigate('/policy')
      }
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['login-container']}>
          <div className={styles['image-container']}>
            <img src={roadImage} />
          </div>
          <LoginForm callAPI={callAPIAndSaveToken} showError={isError} />
        </div>
      )}
    </>
  )
}
