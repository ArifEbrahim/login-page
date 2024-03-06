import Alert from '.'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Alert', () => {
  it('displays some text', () => {
    render(<Alert text={'test text'} show={true} />)
    expect(screen.getByText('test text')).toBeInTheDocument()
  })

  it('can be toggled to show or not show', () => {
    render(<Alert text={'test text'} show={false} />)
    expect(screen.queryByText('test text')).not.toBeInTheDocument()
  })
})
