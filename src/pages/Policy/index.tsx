import axios from 'axios'
import { useEffect, useState } from 'react'
import PolicyContent from './PolicyContent'
import { useNavigate } from 'react-router-dom'
import TextFormatter from '../../utils/textFormatter'

function Policy() {
  const [policyData, setPolicyData] = useState({})
  const isLoading = Object.keys(policyData).length === 0
  const navigate = useNavigate()
  console.log({ isLoading })

  const handleClick = () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
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
        const formatter = new TextFormatter(response.data.policy)
        const data = formatter.processData()
        setPolicyData(data)
      }
    }

    getAPIData()
  }, [])

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>My Policy</h1>
          <PolicyContent {...policyData} />
          <button onClick={handleClick}>Sign out</button>
        </>
      )}
    </>
  )
}

export default Policy
