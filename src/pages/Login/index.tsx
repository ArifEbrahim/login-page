import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import styles from './Login.module.css'
import roadImage from '../../assets/road.png'
import { PiSignInBold } from 'react-icons/pi'
import Heading from '../../components/Heading'
import Button from '../../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const URL = 'https://api.bybits.co.uk/auth/token'
  const CONFIG = {
    headers: {
      environment: 'mock'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        <div className={styles['form-container']}>
          <div className={styles['form-content']}>
            <Heading text="Log in." />
            <form onSubmit={handleSubmit}>
              <Input
                value={email}
                onChange={setEmail}
                placeholder="Your Email Address"
                type="email"
              />
              <Input
                value={password}
                onChange={setPassword}
                placeholder="Your Password"
                type="password"
              />
              <Button type="submit">
                <span>log in</span>
                <PiSignInBold />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
