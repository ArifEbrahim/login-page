import styles from './Alert.module.css'

interface AlertProps {
  text: string
  show: boolean
}

function Alert({ text, show }: AlertProps) {
  return (
    show && (
      <div className={styles['alert-container']}>
        <div className={styles['alert-content']}>
          <p>{text}</p>
        </div>
      </div>
    )
  )
}
export default Alert
