import React from 'react'
import { render, screen } from '@testing-library/react';
import {TopSection, PersonaliaModel} from '../TopSection';

test('Expect name to be Jane Doe', () => {
  const personalia = {} as PersonaliaModel
  const onSubmit = () => null
  const fallbackName = 'Jane Doe'
  
  render(<TopSection onSubmit={onSubmit} personalia={personalia} />)
  expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(fallbackName)
})