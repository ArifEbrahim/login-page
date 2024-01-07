import axios from 'axios'
import { useEffect, useState } from 'react'

function Policy() {
  const [policyData, setPolicyData] = useState({})
  const isLoading = Object.keys(policyData).length === 0

  const getAPIData = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const URL = 'https://api.bybits.co.uk/policys/details'
      const config = {
        headers: {
          environment: 'mock',
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.get(URL, config)
      setPolicyData(response?.data?.policy)
    }
  }

  useEffect(() => {
    getAPIData()
  }, [])

  return isLoading ? <div>Loading...</div> : <div>content</div>
}

export default Policy
