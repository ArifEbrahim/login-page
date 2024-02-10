import styles from './Error.module.css'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles['error-container']}>
        <h2>Oops!</h2>
        <p>Sorry, an unexpected error occured</p>
        <div className={styles['button-container']}>
          <Button onClick={() => navigate('/')}>
            <span>Home page</span>
          </Button>
        </div>
      </div>
    </>
  )
}
