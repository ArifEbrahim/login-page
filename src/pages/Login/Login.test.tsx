import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Login from './index.tsx'
import axios from 'axios'

vi.mock('axios')

describe('Login', () => {
  it('renders a header with the correct text', () => {
    render(<Login />)
    expect(screen.getByText(/log in./i)).toBeInTheDocument()
  })

  it('renders an email and password input', () => {
    render(<Login />)

    expect(
      screen.getByPlaceholderText(/your Email Address/i)
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your Password/i)).toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<Login />)
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('call axios on submit', () => {
    render(<Login />)
    const user = userEvent.setup()
    user.click(screen.getByRole('button', { name: /log in/i }))
    expect(axios.post).toHaveBeenCalled()
  })
})
