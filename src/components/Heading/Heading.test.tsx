import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Heading from '.'

describe('Heading', () => {
  it('displays a heading', () => {
    render(<Heading text={'test'} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
