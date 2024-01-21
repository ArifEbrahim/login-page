import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import roadImage from '../../assets/road.png'
import LoginForm from '../../components/LoginForm'
import { CallAPIProps } from '../../types/Login'

export default function Login() {
  const navigate = useNavigate()
  const URL = 'https://api.bybits.co.uk/auth/token'
  const CONFIG = {
    headers: {
      environment: 'mock'
    }
  }

  const callAPIAndSaveToken = async ({ email, password }: CallAPIProps) => {
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
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles['login-container']}>
        <div className={styles['image-container']}>
          <img src={roadImage} />
        </div>
        <LoginForm callAPI={callAPIAndSaveToken} />
      </div>
    </>
  )
}
