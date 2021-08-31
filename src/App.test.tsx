import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

describe('CountsBox Component', () => {
  test('should be rendered', () => {
    render(<App />);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
