import { describe, it, expect } from 'vitest'
import TextFormatter from './textFormatter'
import mockAPIResponse from '../__mocks__/Policy/APIResponse.json'

describe('TextFormatter', () => {
  const formatter = new TextFormatter(mockAPIResponse)

  it('stores the policy object', () => {
    expect(formatter.rawPolicy).toBe(mockAPIResponse)
  })

  it('returns an object of formatted data', () => {
    const data = formatter.processData()
    expect(data.policyRef).toBe('apple orange pear')
    expect(data.coverType).toBe('Comprehensive')
    expect(data.car).toBe('Tesla S black - WO123XX')
    expect(data.name).toBe('Dave Jones')
    expect(data.address).toBe('Flat 1, 11 The Street, Little Hampton, W53TR')
  })
})
