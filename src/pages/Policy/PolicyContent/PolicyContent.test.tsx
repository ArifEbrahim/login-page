import PolicyContent from '.'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('PolicyContent', () => {
  it('displays headers for different policy sections', () => {
    render(<PolicyContent />)
    expect(screen.getByText(/policy reference/i)).toBeInTheDocument()
    expect(screen.getByText(/cover type/i)).toBeInTheDocument()
    expect(screen.getByText(/car/i)).toBeInTheDocument()
    expect(screen.getByText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/address/i)).toBeInTheDocument()
  })

  it('displays policy data', () => {
    const mockData = {
      policyRef: 'apple orange pear',
      coverType: 'Comprehensive',
      car: 'Tesla S Black - WO123XX',
      name: 'Dave Jones',
      address: 'Flat 1, 11 The Street, Little Hampton, W53RT'
    }
    render(<PolicyContent {...mockData} />)
    expect(screen.getByText(/apple orange pear/i)).toBeInTheDocument()
    expect(screen.getByText(/comprehensive/i)).toBeInTheDocument()
    expect(screen.getByText(/tesla s black - WO123XX/i)).toBeInTheDocument()
    expect(screen.getByText(/dave jones/i)).toBeInTheDocument()
    expect(
      screen.getByText(/flat 1, 11 the street, little hampton, W53RT/i)
    ).toBeInTheDocument()
  })
})
