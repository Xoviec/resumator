import React from 'react'
import { render, screen } from '@testing-library/react';
import {TopSection, PersonaliaModel} from '../TopSection';

const defaultProps = {
  personalia: {} as PersonaliaModel,
  onSubmit: jest.fn()
}

test('expect name to be Jane Doe', () => {
  const fallbackName = 'Jane Doe'
  
  render(<TopSection {...defaultProps} />)
  expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(fallbackName)
})

test('expect fallback introduction to be displayed', () => {
  const fallbackText = `Jane has nothing to tell you.`
  
  render(<TopSection {...defaultProps} />)
  expect(screen.getByText(fallbackText)).toBeInTheDocument()
})

const personalia = {
  firstName: 'Donald',
  lastName: 'Trump',
  email: 'donald.trump@frontmen.nl'
} as PersonaliaModel

test('expect name to be Donald Trump', () => {
  const name = `${personalia.firstName} ${personalia.lastName}`

  render(<TopSection personalia={personalia} onSubmit={defaultProps.onSubmit} />)
  expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(name)
})

test('expect email to be displayed', () => {
  render(<TopSection personalia={personalia} onSubmit={defaultProps.onSubmit} />)
  expect(screen.getByText(personalia.email)).toBeInTheDocument()
})