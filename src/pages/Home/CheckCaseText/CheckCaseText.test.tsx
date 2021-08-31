import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckCaseText from './index';

describe('CheckCaseText', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<CheckCaseText />);

    expect(getByTestId('check-case-text')).toBeInTheDocument();
  });
});
