import { PolicyContentProps } from '../../../types/Policy'
import styles from './PolicyContent.module.css'

function PolicyContent({
  policyRef,
  coverType,
  car,
  name,
  address
}: PolicyContentProps) {
  return (
    <>
      <div className={styles['content-title']}>Policy reference</div>
      <div className={styles['content-text']}>{policyRef}</div>
      <div className={styles['content-title']}>Cover type</div>
      <div className={styles['content-text']}>{coverType}</div>
      <div className={styles['content-title']}>Car</div>
      <div className={styles['content-text']}>{car}</div>
      <div className={styles['content-title']}>Name</div>
      <div className={styles['content-text']}>{name}</div>
      <div className={styles['content-title']}>Address</div>
      <div className={styles['content-text']}>{address}</div>
    </>
  )
}

export default PolicyContent
