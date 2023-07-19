import React from 'react'
import { render, screen } from '@testing-library/react'
import TypoAction from './index'

test('renders TypoAction with text and pointText', () => {
  render(<TypoAction text='안녕하세요 구리입니다' pointText='구리' />)
  const element = screen.getByText(/구리/i)
  expect(element).toBeInTheDocument()
})
