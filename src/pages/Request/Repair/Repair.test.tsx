import React from 'react';
import { MemoryRouter, Router } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Repair from './index';
import { FormProvider } from '../../../contexts/FormContext';
import serializeFormData from '../../../helpers/serializeFormData';
import { createRequest } from '../../../queries/requestQueries';

jest.mock('../../../helpers/generateRequestId', () => () => ({ id: '8681-2833-01', store: '01' }));

const mockFormData = {
  serialNumber: '1234567890ABCDE',
  product: 'notebook',
  agree: {
    tos: true,
    privacy: true,
  },
  address: 'Test Street. Jest Boulevard',
  birthdate: '1998-12-31T22:00:00.000Z',
  nationalityId: '12345678901',
  email: 'a@a.com',
  name: 'Function Test',
  problem: "My computer doesn't work.",
  images: ['https://res.cloudinary.com/kt-sec/image/upload/v1630256345/nvwrifgvmihq9dhsqsqd.png'],
};

const mocks = [
  {
    request: {
      query: createRequest,
      variables: serializeFormData(mockFormData),
    },
    result: {
      data: {
        insert_requests_one: {
          request_id: '8681-2833-01',
          __typename: 'requests',
        },
      },
    },
  },
];

describe('Repair Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be rendered', async () => {
    render(
      <MockedProvider>
        <FormProvider>
          <MemoryRouter>
            <Repair />
          </MemoryRouter>
        </FormProvider>
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('repair-page')).toBeInTheDocument();
  });

  test('should trigger navigation by buttons', async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    render(
      <MockedProvider mocks={mocks}>
        <FormProvider>
          {/* @ts-ignore */}
          <Router history={historyMock}>
            <Repair />
          </Router>
        </FormProvider>
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const cancel = screen.getByTestId('cancel-button');
    const prev = screen.getByTestId('prev-button');

    fireEvent.click(cancel);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(historyMock.push).toBeCalledTimes(1);

    fireEvent.click(prev);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(historyMock.push).toBeCalledTimes(2);
  });
});
