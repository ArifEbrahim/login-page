import axios from 'axios'
import { useEffect } from 'react'

function Policy() {
  useEffect(() => {
    const URL = 'https://api.bybits.co.uk/policys/details'
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        environment: 'mock',
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(URL, config)
  })

  return <div>policy</div>
}

export default Policy
