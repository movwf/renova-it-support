import React from 'react';
import ReactDOM from 'react-dom';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import RequestTable from './index';
import { IRequestTable } from '../../types/components/RequestTable.types';
import { getRequestData, updateRequest } from '../../queries/requestQueries';

const original = ReactDOM.createPortal;

// Inital props
const simpleProps: IRequestTable = {
  rowData: [
    {
      id: '1',
      product: 'pc',
      requestId: '1234-5678-01',
      time: new Date().toLocaleString(),
      status: 'inRequest',
    },
  ],
};

const mocks: any = [
  {
    request: {
      query: updateRequest,
      variables: {
        request_id: '1234-5678-01',
        status: 'inRepair',
        store_id: '01',
        service_note: 'Test Note',
      },
    },
    result: {
      data: {
        update_requests_by_pk: {
          request_id: '1234-5678-01',
          __typename: 'requests',
        },
      },
    },
  },
  {
    request: {
      query: getRequestData,
      variables: {
        request_id: '1234-5678-01',
      },
    },
    result: {
      data: {
        requests: [
          {
            __typename: 'requests',
            created_At: '2021-08-27',
            customer: {
              __typename: 'customers',
              email: 'mehmet@yavuzlarholding.com',
              name: 'Mehmet Yavuz',
            },
            image_urls: [
              'https://res.cloudinary.com/kt-sec/image/upload/v1630064715/ineuq9elffz4wuqem1wl.png',
            ],
            problem: 'Bilgisayarım çok ısınıyor. 15 dakikada bir kendine reset atıyor.',
            product: {
              __typename: 'products',
              product_name: 'Notebook',
            },
            request_id: '7473-5742-01',
            serial_number: '2569856424AEG3D',
            service_note: null,
            status: 'inRequest',
            store_id: '01',
          },
        ],
      },
    },
  },
];

describe('RequestTable Component', () => {
  beforeEach(() => {
    render(<RequestTable {...simpleProps} />);
  });

  afterAll(() => {
    cleanup();
  });

  test('should be rendered', () => {
    expect(screen.getByTestId('request-table')).toBeInTheDocument();
  });

  test('should be rendered with empty rowData array', () => {
    cleanup();

    render(<RequestTable {...{ rowData: [] }} />);

    expect(screen.getByTestId('request-table')).toBeInTheDocument();
  });

  test('should have as many rows as rowData array count', () => {
    simpleProps.rowData.forEach((row) => {
      expect(screen.getByTestId(`request-table-row-${row.id}`)).toBeInTheDocument();
    });
  });
});

describe('RequestTable Admin Component', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element, node) => {
      console.log(node);
      return element;
    });

    render(<RequestTable.Admin {...simpleProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  test('should be rendered', () => {
    expect(screen.getByTestId('request-table')).toBeInTheDocument();
  });

  test('should have as many rows as rowData array count', () => {
    render(<RequestTable.Admin {...simpleProps} />);

    simpleProps.rowData.forEach((row) => {
      expect(screen.getByTestId(`request-table-row-${row.id}`)).toBeInTheDocument();
    });
  });

  test('should open edit modal when a row clicked', async () => {
    ReactDOM.createPortal = original;
    const appWrapper = document.createElement('div');
    appWrapper.setAttribute('id', 'portal-node');
    appWrapper.setAttribute('data-testid', 'portal-test');
    appWrapper.append(document.createTextNode('Test'));

    document.body.append(appWrapper);

    render(
      // @ts-ignore
      <MockedProvider mocks={mocks}>
        <RequestTable.Admin {...simpleProps} />
      </MockedProvider>
    );

    const row = screen.getByTestId('request-table-row-1');

    fireEvent.click(row);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  test('should handleShowRequest function update states', () => {
    document.body.innerHTML = '';

    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    ReactDOM.createPortal = jest.fn((element, node) => <div>Modal</div>);

    render(
      // @ts-ignore
      <MockedProvider mocks={mocks}>
        <RequestTable.Admin {...simpleProps} />
      </MockedProvider>
    );
    const row = screen.getByTestId(`request-table-row-1`);

    const spy = jest.spyOn(React, 'useState');

    fireEvent.click(row);

    expect(spy).toBeCalledTimes(7);
  });
});
