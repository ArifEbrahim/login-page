import styles from './Input.module.css'

interface inputProps {
  type: string
  placeholder: string
  onChange: (value: string) => void
  value?: string
}

function Input({ type, placeholder = '', onChange, value = '' }: inputProps) {
  return (
    <>
      <div className={styles['input-wrapper']}>
        <div className={styles['input-container']}>
          <input
            type={type}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            value={value}
            required
          />
        </div>
      </div>
    </>
  )
}

export default Input
