import Policy from '.'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import mockAPIData from '../../__mocks__/Policy/APIResponse.json'
import { PolicyContentProps } from '../../types/Policy'

vi.mock('axios')
vi.mock('./PolicyContent', () => ({
  default: (props: PolicyContentProps) => (
    <div data-testid="policy-content">
      {<pre>{JSON.stringify(props, null, 2)}</pre>}
    </div>
  )
}))
const mockUseNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('Policy', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('when data is not available', () => {
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
  })

  describe('when data is available', () => {
    beforeEach(() => {
      Storage.prototype.getItem = vi.fn().mockReturnValue('Abc123')
      axios.get = vi.fn().mockResolvedValue({ data: { policy: mockAPIData } })
    })

    it('calls the API on render with correct data', () => {
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

    it('displays content when data is received', async () => {
      render(<Policy />)

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled()
      })
      expect(await screen.findByText(/my policy/i)).toBeInTheDocument()
      expect(
        await screen.findByRole('button', { name: /sign out/i })
      ).toBeInTheDocument()
    })

    it('clears local storage and redirects user when sign out clicked', async () => {
      Storage.prototype.clear = vi.fn()
      const user = userEvent.setup()
      render(<Policy />)

      await waitFor(() => {
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
      })
      await user.click(screen.getByRole('button', { name: /sign out/i }))
      expect(localStorage.clear).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith('/')
    })

    it('calls PolicyContent with the right props', async () => {
      render(<Policy />)
      await waitFor(() => {
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
      })
      const content = screen.getByTestId('policy-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('policyRef')
    })
  })
})
