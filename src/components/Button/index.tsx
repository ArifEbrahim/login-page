import './Button.module.css'

interface ButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  children: React.ReactNode | string
  disabled?: boolean
}

function Button({
  onClick,
  type = 'button',
  children,
  disabled = false
}: ButtonProps) {
  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
