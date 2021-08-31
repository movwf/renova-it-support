import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from './index';

describe('Home', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId('home')).toBeInTheDocument();
  });
});
