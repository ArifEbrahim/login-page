import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Login from './index.tsx'

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
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
