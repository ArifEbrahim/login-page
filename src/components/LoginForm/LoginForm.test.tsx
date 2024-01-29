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

  describe('Validation', () => {
    it('displays no errors when initially loaded', () => {
      render(<LoginForm callAPI={mockCallAPI} />)
      const emailErrorMsg = screen.queryByText(/Email must not be blank/)
      const passwordErrorMsg = screen.queryByText(/Password must not be blank/)
      expect(emailErrorMsg).not.toBeInTheDocument()
      expect(passwordErrorMsg).not.toBeInTheDocument()
    })

    it('displays an error when form is submitted but inputs are empty', async () => {
      const user = userEvent.setup()
      render(<LoginForm callAPI={mockCallAPI} />)
      const submitBtn = screen.getByRole('button', { name: /log in/i })
      await user.click(submitBtn)
      const emailErrorMsg = screen.getByText(/Email must not be blank/)
      const passwordErrorMsg = screen.getByText(/Password must not be blank/)
      expect(emailErrorMsg).toBeInTheDocument()
      expect(passwordErrorMsg).toBeInTheDocument()
      expect(mockCallAPI).not.toHaveBeenCalled()
    })

    it('displays an error if input not valid and user clicks away', async () => {
      const user = userEvent.setup()
      render(<LoginForm callAPI={mockCallAPI} />)
      const emailInput = screen.getByPlaceholderText(/your email address/i)
      await user.click(emailInput)
      const passwordInput = screen.getByPlaceholderText(/your password/i)
      await user.click(passwordInput)
      const formContainer = screen.getByTestId(/form-container/i)
      await userEvent.click(formContainer)
      const emailErrorMsg = screen.getByText(/email must not be blank/i)
      const passwordErrorMsg = screen.getByText(/password must not be blank/i)
      expect(emailErrorMsg).toBeInTheDocument()
      expect(passwordErrorMsg).toBeInTheDocument()
    })

    it('removes error on keypress if input is valid', async () => {
      const user = userEvent.setup()
      render(<LoginForm callAPI={mockCallAPI} />)
      const submitBtn = screen.getByRole('button', { name: /log in/i })
      await user.click(submitBtn)
      const emailErrorMsg = screen.getByText(/email must not be blank/i)
      const passwordErrorMsg = screen.getByText(/password must not be blank/i)
      expect(emailErrorMsg).toBeInTheDocument()
      expect(passwordErrorMsg).toBeInTheDocument()
      const emailInput = screen.getByPlaceholderText(/your email address/i)
      await user.type(emailInput, 'test@domain.com')
      expect(
        screen.queryByText(/email must not be blank/i)
      ).not.toBeInTheDocument()
      const passwordInput = screen.getByPlaceholderText(/your password/i)
      await user.type(passwordInput, 'abc123')
      expect(
        screen.queryByText(/password must not be blank/i)
      ).not.toBeInTheDocument()
    })

    it('removes errors following submission of valid input', async () => {
      const user = userEvent.setup()
      render(<LoginForm callAPI={mockCallAPI} />)
      const submitBtn = screen.getByRole('button', { name: /log in/i })
      await user.click(submitBtn)
      const emailErrorMsg = screen.getByText(/email must not be blank/i)
      const passwordErrorMsg = screen.getByText(/password must not be blank/i)
      expect(emailErrorMsg).toBeInTheDocument()
      expect(passwordErrorMsg).toBeInTheDocument()
      const emailInput = screen.getByPlaceholderText(/your email address/i)
      await user.type(emailInput, 'test@domain.com')
      const passwordInput = screen.getByPlaceholderText(/your password/i)
      await user.type(passwordInput, 'abc123')
      await user.click(submitBtn)
      expect(
        screen.queryByText(/email must not be blank/i)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/password must not be blank/i)
      ).not.toBeInTheDocument()
    })
  })
})
