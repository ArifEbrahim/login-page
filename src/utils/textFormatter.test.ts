import { describe, it, expect } from 'vitest'
import TextFormatter from './textFormatter'
import mockAPIResponse from '../__mocks__/Policy/APIResponse.json'

describe('TextFormatter', () => {
  const formatter = new TextFormatter(mockAPIResponse)

  it('stores the policy object', () => {
    expect(formatter.rawPolicy).toBe(mockAPIResponse)
  })
})
