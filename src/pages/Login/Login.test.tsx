import { render, screen, waitFor } from '@testing-library/react'
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

  it('calls axios on submit', async () => {
    const user = userEvent.setup()
    const url = 'https://api.bybits.co.uk/auth/token'
    const data = {
      username: 'test@domain.com',
      password: 'abc123',
      type: 'USER_PASSWORD_AUTH'
    }
    const config = {
      headers: {
        environment: 'mock'
      }
    }
    render(<Login />)
    const emailInput = screen.getByPlaceholderText(/your email address/i)
    const passwordInput = screen.getByPlaceholderText(/your password/i)
    const submitBtn = screen.getByRole('button', { name: /log in/i })

    await user.type(emailInput, data.username)
    await user.type(passwordInput, data.password)
    await user.click(submitBtn)
    expect(axios.post).toHaveBeenCalledWith(url, data, config)
  })

  it('saves the token to localstorage', async () => {
    Storage.prototype.setItem = vi.fn()
    axios.post = vi.fn().mockResolvedValue({ data: { access_token: '123' } })
    const user = userEvent.setup()
    render(<Login />)
    const emailInput = screen.getByPlaceholderText(/your email address/i)
    const passwordInput = screen.getByPlaceholderText(/your password/i)
    const submitBtn = screen.getByRole('button', { name: /log in/i })

    await user.type(emailInput, 'test@domain.com')
    await user.type(passwordInput, 'abc123')
    await user.click(submitBtn)

    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '123')
    vi.clearAllMocks()
  })
})
