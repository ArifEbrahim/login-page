import axios from 'axios'
import { useEffect, useState } from 'react'
import PolicyContent from '../../components/PolicyContent'
import { useNavigate } from 'react-router-dom'
import TextFormatter from '../../utils/textFormatter'
import styles from './Policy.module.css'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import { PiSignOutBold } from 'react-icons/pi'
import Loader from '../../components/Loader'

function Policy() {
  const [policyData, setPolicyData] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const getAPIData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const URL = 'https://api.bybits.co.uk/policys/details'
          const config = {
            headers: {
              environment: 'mock',
              Authorization: `Bearer ${token}`
            }
          }

          await axios.get(URL, config).then(response => {
            const formatter = new TextFormatter(response.data)
            const data = formatter.processData()
            setPolicyData(data)
          })
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAPIData()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['policy-container']}>
          <section className={styles['policy-section-1']}>
            <div className={styles['policy-section-2']}>
              <Heading text="My Policy." />
              <PolicyContent {...policyData} />
              <div className={styles['button-container']}>
                <Button onClick={handleClick}>
                  <span>Sign out</span>
                  <PiSignOutBold size={'1.4em'} />
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Policy
