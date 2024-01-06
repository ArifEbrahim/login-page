interface inputProps {
  type: string
  placeholder: string
  onChange: (value: string) => void
  value?: string
}

function Input({ type, placeholder = '', onChange, value = '' }: inputProps) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        value={value}
        required
      />
    </>
  )
}

export default Input
