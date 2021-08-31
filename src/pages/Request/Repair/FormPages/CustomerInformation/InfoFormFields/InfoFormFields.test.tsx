import React from 'react';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import InfoFormFields from './index';
import { FormProvider } from '../../../../../../contexts/FormContext';

describe('InfoFormFields Component', () => {
  test('should be rendered', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <InfoFormFields />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('info-form-fields')).toBeInTheDocument();
  });
});
