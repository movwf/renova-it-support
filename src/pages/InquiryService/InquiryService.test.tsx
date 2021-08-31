import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import InquiryService from './index';

describe('InquiryService', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<InquiryService />);

    expect(getByTestId('inquiry-service')).toBeInTheDocument();
  });
});
