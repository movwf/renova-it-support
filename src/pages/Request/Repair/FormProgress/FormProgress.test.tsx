import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormProgress from './index';

describe('FormProgress Component', () => {
  test('should be rendered', () => {
    render(<FormProgress currentIndex={0} />);

    expect(screen.getByTestId('form-progress')).toBeInTheDocument();
  });
});
