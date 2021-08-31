import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import Status from './index';
import { checkRequestStatus } from '../../../queries/requestQueries';

const requestId = '1234-5678-01';

const mocks = [
  {
    request: {
      query: checkRequestStatus,
      variables: {
        request_id: undefined,
      },
    },
    result: {
      data: {
        requests: [
          {
            request_id: '1234-5678-01',
            service_note: 'We will repair it ASAP!',
            status: 'repaired',
            __typename: 'requests',
          },
        ],
      },
    },
  },
];

jest.mock('react-router-dom', () => ({
  useHistory: () => {
    const push = () => jest.fn();
    return { push, location: { state: { request_id: requestId } } };
  },
}));

describe('Status Page', () => {
  test('should be rendered', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Status />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('status-page')).toBeInTheDocument();
  });
});
