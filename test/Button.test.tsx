import { Button } from '@/components/ui/button'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
 
describe('Button', () => {
  it('renders the correct text', () => {
    render(<Button>click me</Button>)
 
    const buttonElement = screen.getByRole('button', { name: /click me/i })
 
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent('click me')
    expect(buttonElement).not.toHaveTextContent('user can\'t write')
  })
})
