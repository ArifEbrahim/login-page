import { PulseLoader } from 'react-spinners'
import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles['loader-box']} data-testid="loader-box">
      <PulseLoader size={'15px'} color="#fff" />
    </div>
  )
}

export default Loader
