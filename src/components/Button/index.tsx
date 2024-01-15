import './Button.module.css'

interface ButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  children: React.ReactNode | string
}

function Button({ onClick, type = 'button', children }: ButtonProps) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button
