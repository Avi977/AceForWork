import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  expect(document.body).toBeInTheDocument();
});

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveTextContent(/journey/i);
});

test('renders navigation menu', () => {
  render(<App />);
  const navigation = screen.getByRole('navigation');
  expect(navigation).toBeInTheDocument();
});
