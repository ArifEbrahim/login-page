import styles from './Alert.module.css'

interface AlertProps {
  text: string
  show: boolean
}

function Alert({ text, show }: AlertProps) {
  return (
    show && (
      <div className={styles['alert-container']}>
        <p>{text}</p>
      </div>
    )
  )
}
export default Alert
