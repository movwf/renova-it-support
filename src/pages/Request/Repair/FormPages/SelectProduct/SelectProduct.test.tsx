import React from 'react';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import SelectProduct from './index';
import { FormProvider } from '../../../../../contexts/FormContext';

describe('Select Product Page', () => {
  test('should be rendered', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <SelectProduct />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('select-product-page')).toBeInTheDocument();
  });
});
