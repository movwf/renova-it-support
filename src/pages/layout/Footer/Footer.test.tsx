import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './index';

describe('Footer', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<Footer />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });
});
