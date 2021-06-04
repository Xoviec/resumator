import React from 'react'
import { render, screen } from '@testing-library/react';
import {TopSection} from '../TopSection';

test('Expect name to be Jane Doe', () => {
  const personalia = {}
  const fallbackName = 'Jane Doe'
  
  render(<TopSection personalia={personalia} />)
  expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(fallbackName)
})