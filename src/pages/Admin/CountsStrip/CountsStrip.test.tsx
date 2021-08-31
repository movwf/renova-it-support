import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import CountsStrip, { ICountsStrip, listedCounts } from './index';

describe('CountsStrip Component', () => {
  // Inital props
  const simpleProps: ICountsStrip = {
    data: {
      requests: [
        {
          created_At: new Date().toLocaleString(),
          product: {
            product_name: 'pc',
          },
          request_id: '1234-5678-01',
          status: 'inRequest',
          store_id: '01',
          service_note: 'Hi, I am service.',
          serial_number: '165498156123ABC',
          image_urls: ['/image.png'],
          customer_email: 'test@jest.com',
          problem: 'No problem, just te(a)sting ;-)',
        },
      ],
    },
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<CountsStrip {...simpleProps} />);

    expect(getByTestId('counts-strip')).toBeInTheDocument();
  });

  test('should have as many count boxes as listedCounts (pre-selected count types)', () => {
    const { getByTestId } = render(<CountsStrip {...simpleProps} />);

    expect(getByTestId('counts-strip').childElementCount).toBe(listedCounts.length);
  });

  test('should have as many count boxes as listedCounts (pre-selected count types)', () => {
    const { getByTestId } = render(<CountsStrip {...simpleProps} />);

    expect(getByTestId('counts-strip').childElementCount).toBe(listedCounts.length);
  });

  test('should have total count set with request data', () => {
    const { queryByText } = render(<CountsStrip {...simpleProps} />);

    // @ts-ignore
    expect(queryByText('Total Requests')?.nextElementSibling.innerHTML).toBe(
      simpleProps.data.requests.length.toString()
    );
  });

  test('should have in repair count set with request data', () => {
    const { queryByText } = render(<CountsStrip {...simpleProps} />);

    const inRepairCount = simpleProps.data.requests.filter(
      (request) => request.status === 'inRepair'
    ).length;

    // @ts-ignore
    expect(queryByText('In Repair')?.nextElementSibling.innerHTML).toBe(inRepairCount.toString());
  });

  test('should have in request count set with request data', () => {
    const { queryByText } = render(<CountsStrip {...simpleProps} />);

    const inRequestCount = simpleProps.data.requests.filter(
      (request) => request.status === 'inRequest'
    ).length;

    // @ts-ignore
    expect(queryByText('In Request')?.nextElementSibling.innerHTML).toBe(inRequestCount.toString());
  });
});
