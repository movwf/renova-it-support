import React from 'react';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import SerialNumber from './index';
import { FormProvider } from '../../../../../../contexts/FormContext';

describe('Serial Number Component', () => {
  test('should be rendered', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <SerialNumber />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('serial-number-title')).toBeInTheDocument();
  });
});
