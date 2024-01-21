import LoginForm from '.'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('LoginForm', () => {
  const mockCallAPI = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders a header with the correct text', () => {
    render(<LoginForm callAPI={mockCallAPI} />)
    expect(screen.getByText(/log in./i)).toBeInTheDocument()
  })

  it('renders an email and password input', () => {
    render(<LoginForm callAPI={mockCallAPI} />)
    expect(
      screen.getByPlaceholderText(/your email address/i)
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your password/i)).toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<LoginForm callAPI={mockCallAPI} />)
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('submit button calls a funtion that is passed in', async () => {
    const user = userEvent.setup()
    render(<LoginForm callAPI={mockCallAPI} />)
    const emailInput = screen.getByPlaceholderText(/your email address/i)
    const passwordInput = screen.getByPlaceholderText(/your password/i)
    const submitBtn = screen.getByRole('button', { name: /log in/i })
    await user.type(emailInput, 'test@domain.com')
    await user.type(passwordInput, 'abc123')
    await user.click(submitBtn)
    expect(mockCallAPI).toHaveBeenCalledWith({
      email: 'test@domain.com',
      password: 'abc123'
    })
  })
})
