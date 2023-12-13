import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Login from './index.tsx'

describe('Login', () => {
  it('renders a header with the correct text', () => {
    render(<Login />)
    expect(screen.getByText(/Log in./i)).toBeInTheDocument()
  })
})
