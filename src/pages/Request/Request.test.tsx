import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import Request from './index';
import { FormProvider } from '../../contexts/FormContext';

describe('InquiryService', () => {
  test('should be rendered', async () => {
    render(
      <MockedProvider>
        <FormProvider>
          <BrowserRouter>
            <Request />
          </BrowserRouter>
        </FormProvider>
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('request-page')).toBeInTheDocument();
  });
});
