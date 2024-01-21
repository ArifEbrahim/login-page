import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import Login from './index.tsx'
import axios from 'axios'

vi.mock('axios')
const mockUseNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

const getElements = () => {
  const emailInput = screen.getByPlaceholderText(/your email address/i)
  const passwordInput = screen.getByPlaceholderText(/your password/i)
  const submitBtn = screen.getByRole('button', { name: /log in/i })

  return { emailInput, passwordInput, submitBtn }
}

describe('Login', () => {
  beforeEach(() => {
    Storage.prototype.setItem = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
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

    const { emailInput, passwordInput, submitBtn } = getElements()
    await user.type(emailInput, data.username)
    await user.type(passwordInput, data.password)
    await user.click(submitBtn)
    expect(axios.post).toHaveBeenCalledWith(url, data, config)
  })

  it('saves the token to localStorage', async () => {
    axios.post = vi.fn().mockResolvedValue({ data: { access_token: '123' } })
    const user = userEvent.setup()
    render(<Login />)

    const { emailInput, passwordInput, submitBtn } = getElements()

    await user.type(emailInput, 'test@domain.com')
    await user.type(passwordInput, 'abc123')
    await user.click(submitBtn)

    expect(localStorage.setItem).toHaveBeenCalledWith('token', '123')
  })

  it('redirects the user to the Policy page when token successfuly recieved', async () => {
    axios.post = vi.fn().mockResolvedValue({ data: { access_token: '123' } })
    const user = userEvent.setup()
    render(<Login />)

    const { emailInput, passwordInput, submitBtn } = getElements()

    await user.type(emailInput, 'test@domain.com')
    await user.type(passwordInput, 'abc123')
    await user.click(submitBtn)

    expect(mockUseNavigate).toHaveBeenCalledWith('/policy')
  })

  it('does not store the token or redirect if no token available', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const { emailInput, passwordInput, submitBtn } = getElements()

    await user.type(emailInput, 'test@domain.com')
    await user.type(passwordInput, 'abc123')
    await user.click(submitBtn)

    expect(localStorage.setItem).not.toHaveBeenCalled()
    expect(mockUseNavigate).not.toHaveBeenCalledWith('/policy')
  })

  it('does not store the token or redirect on failed API response', async () => {
    axios.post = vi.fn().mockRejectedValue('')
    const user = userEvent.setup()
    render(<Login />)

    const { emailInput, passwordInput, submitBtn } = getElements()

    await user.type(emailInput, 'test@domain.com')
    await user.type(passwordInput, 'abc123')
    await user.click(submitBtn)

    expect(localStorage.setItem).not.toHaveBeenCalled()
    expect(mockUseNavigate).not.toHaveBeenCalledWith('/policy')
  })

  //   it('does not allow submission with invalid input', async () => {
  //     const user = userEvent.setup()
  //     render(<Login />)

  //     const { emailInput, passwordInput, submitBtn } = getElements()

  //     await user.click(submitBtn)
  //     expect(axios.post).not.toHaveBeenCalled()

  //     await user.type(emailInput, 'bob')
  //     await user.click(submitBtn)
  //     expect(axios.post).not.toHaveBeenCalled()

  //     await user.type(passwordInput, 'abc123')
  //     await user.click(submitBtn)
  //     expect(axios.post).not.toHaveBeenCalled()
  //   })
})
