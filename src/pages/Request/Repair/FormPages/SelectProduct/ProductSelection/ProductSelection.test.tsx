import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import * as RHF from 'react-hook-form';
import '@testing-library/jest-dom';

import ProductSelection from './index';
import { FormProvider } from '../../../../../../contexts/FormContext';

describe('ProductSelection Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be rendered', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <ProductSelection />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('product-selection')).toBeInTheDocument();
  });

  test('should trigger selectedProduct state update when clicked on a product', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    const formSpy = jest.spyOn(RHF, 'useForm');

    render(
      <MockedProvider>
        <FormProvider>
          <ProductSelection />
        </FormProvider>
      </MockedProvider>
    );

    expect(stateSpy).toBeCalled();

    const product = screen.getByTestId('product-selection-pc');

    fireEvent.click(product);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(formSpy).toBeCalled();
  });
});
