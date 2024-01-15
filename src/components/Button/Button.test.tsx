import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '.'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  const mockClickHandler = vi.fn()

  it('displays text', () => {
    render(<Button>test</Button>)
    const button = screen.getByText('test')
    expect(button).toBeInTheDocument()
  })

  it('has an onClick passed in through props', async () => {
    const user = userEvent.setup()
    render(<Button onClick={mockClickHandler}>test</Button>)
    const button = screen.getByRole('button', { name: /test/i })
    expect(button).toBeInTheDocument()
    await user.click(button)
    expect(mockClickHandler).toHaveBeenCalled()
  })

  it('has an optional type property', () => {
    render(<Button type="submit">test</Button>)
    const button = screen.getByText('test') as HTMLButtonElement
    expect(button).toBeInTheDocument()
    expect(button.type).toBe('submit')
  })
})
