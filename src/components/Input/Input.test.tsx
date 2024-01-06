import Input from './input'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const mockOnChange = vi.fn()

describe('Input', () => {
  it('has a placeholder and type', () => {
    render(
      <Input type="email" placeholder="enter email" onChange={mockOnChange} />
    )
    const emailInput: HTMLInputElement =
      screen.getByPlaceholderText('enter email')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput.type).toBe('email')
    expect(emailInput.placeholder).toBe('enter email')
  })

  it('allows users to enter values', async () => {
    const user = userEvent.setup()
    render(
      <Input type="text" onChange={mockOnChange} placeholder="enter text" />
    )
    const textInput: HTMLInputElement =
      screen.getByPlaceholderText('enter text')
    expect(textInput).toBeInTheDocument()
    await user.type(textInput, 'test')
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('displays the value passed in by props', () => {
    render(
      <Input
        type="text"
        onChange={mockOnChange}
        value="test"
        placeholder="enter text"
      />
    )
    const textInput: HTMLInputElement =
      screen.getByPlaceholderText('enter text')
    expect(textInput.value).toBe('test')
  })
})
