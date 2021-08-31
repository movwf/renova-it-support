import React from 'react';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import CustomerInformation from './index';
import { FormProvider } from '../../../../../contexts/FormContext';

describe('CustomerInformation Component', () => {
  test('should be render', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <CustomerInformation />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('customer-information')).toBeInTheDocument();
  });
});
