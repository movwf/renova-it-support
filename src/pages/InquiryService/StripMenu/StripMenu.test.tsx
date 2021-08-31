import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import StripMenu from './index';

describe('StripMenu', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<StripMenu />);

    expect(getByTestId('strip-menu')).toBeInTheDocument();
  });
});
