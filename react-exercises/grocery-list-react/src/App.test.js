import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Clear All item button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Clear All Items/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders oranges of item', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/oranges/i);
  expect(linkElement).toBeInTheDocument();
});

