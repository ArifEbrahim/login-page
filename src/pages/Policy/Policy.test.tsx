import Policy from '.'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { describe, it, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('axios')
vi.mock('./PolicyContent', () => <div>content</div>)
const mockUseNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('Policy', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('calls the API on render with correct data', () => {
    Storage.prototype.getItem = vi.fn().mockReturnValue('Abc123')
    const url = 'https://api.bybits.co.uk/policys/details'
    const config = {
      headers: {
        environment: 'mock',
        Authorization: 'Bearer Abc123'
      }
    }

    render(<Policy />)
    expect(axios.get).toHaveBeenCalledWith(url, config)
  })

  it('does not call the API if no token', () => {
    Storage.prototype.getItem = vi.fn()
    render(<Policy />)
    expect(axios.get).not.toHaveBeenCalled()
  })

  it('displays a loading screen whilst waiting for data', () => {
    Storage.prototype.getItem = vi.fn()
    render(<Policy />)
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })

  it('displays content when data is received', () => {
    Storage.prototype.getItem = vi.fn().mockReturnValue('Abc123')
    axios.get = vi.fn().mockResolvedValue({ data: { policy: { test: '123' } } })
    render(<Policy />)
    waitFor(() => {
      expect(screen.getByText(/my policy/i)).toBeInTheDocument()
      expect(screen.getByText(/content/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /sign out/i })
      ).toBeInTheDocument()
    })
  })

  it.only('clears local storage and redirects user when sign out clicked', async () => {
    Storage.prototype.clear = vi.fn()
    const user = userEvent.setup()
    Storage.prototype.getItem = vi.fn().mockReturnValue('Abc123')
    axios.get = vi.fn().mockResolvedValue({ data: { policy: { test: '123' } } })
    render(<Policy />)
    waitFor(() => {
      expect(screen.getByText(/loading.../i)).not.toBeInTheDocument()
    })
    await user.click(screen.getByRole('button', { name: /sign out/i }))
    expect(localStorage.clear).toHaveBeenCalled()
    expect(mockUseNavigate).not.toHaveBeenCalledWith('/')
  })
})
