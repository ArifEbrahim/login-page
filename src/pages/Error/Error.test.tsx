import ErrorPage from '.'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

const mockUseNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('Error page', () => {
  it('displays some error text', () => {
    render(<ErrorPage />)
    expect(screen.getByText(/oops!/i)).toBeInTheDocument()
  })

  it('has a button to allow the user to go home', async () => {
    const user = userEvent.setup()
    render(<ErrorPage />)
    const button = screen.getByRole('button', { name: /home page/i })
    expect(button).toBeInTheDocument()
    await user.click(button)
    expect(mockUseNavigate).toHaveBeenCalledWith('/')
  })
})
