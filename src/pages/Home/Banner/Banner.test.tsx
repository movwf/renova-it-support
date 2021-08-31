import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Banner from './index';

describe('Banner', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<Banner />);

    expect(getByTestId('banner')).toBeInTheDocument();
  });
});
