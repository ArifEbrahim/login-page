import PolicyContent from './PolicyContent'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('PolicyContent', () => {
  it('displays headers for different policy sections', () => {
    render(<PolicyContent data={{}} />)
    expect(screen.getByText(/policy reference/i)).toBeInTheDocument()
    expect(screen.getByText(/cover type/i)).toBeInTheDocument()
    expect(screen.getByText(/car/i)).toBeInTheDocument()
    expect(screen.getByText(/policy holder/i)).toBeInTheDocument()
    expect(screen.getByText(/address/i)).toBeInTheDocument()
  })
})
