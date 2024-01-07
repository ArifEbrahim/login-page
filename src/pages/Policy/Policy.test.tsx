import Policy from '.'
import { render, screen } from '@testing-library/react'
import axios from 'axios'
import { describe, it, expect, vi } from 'vitest'

vi.mock('axios')

describe('Policy', () => {
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
})
