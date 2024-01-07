import axios from 'axios'
import { useEffect } from 'react'

function Policy() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      const URL = 'https://api.bybits.co.uk/policys/details'
      const config = {
        headers: {
          environment: 'mock',
          Authorization: `Bearer ${token}`
        }
      }

      axios.get(URL, config)
    }
  })

  return <div>Loading...</div>
}

export default Policy
