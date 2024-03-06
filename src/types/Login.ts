export interface CallAPIProps {
  email: string
  password: string
}

export interface LoginFormProps {
  callAPI: ({ email, password }: CallAPIProps) => void
  showError: boolean
}
