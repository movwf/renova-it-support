import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContactInformation from './index';

describe('ContactInformation', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<ContactInformation />);

    expect(getByTestId('contact-information')).toBeInTheDocument();
  });
});
